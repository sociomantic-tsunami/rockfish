/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## rockfish
 *
 * A NodeJS static file generator API
 *
 * @author   Damian Rodriguez Ramil    <damian.rodriguez@sociomantic.com>
 *
 */

import path                     from 'path';
import fs                       from 'fs';

import Hapi                     from 'hapi';

import config                   from '../cfg/config';
import { getConfig, logger }    from './helpers';
import { addQueryStringToEndPoints, createPagesObjectsArray,
    getAllPostsFromTheAPI, getFileObject, retrieveAndWriteAssets,
    writeAllPages } from './lib';

let rockFishClock;

logger.info( `Current user: ${process.env.USER}` );


/**
 * ## start
 *
 * Starts Rockfish
 *
 * @param {Object} siteConfig site configuration object
 *
 * @return _Void_
 */
export const start = ( siteConfig ) =>
{
    if ( !siteConfig )
    {
        throw new Error( 'siteConfig must be defined' );
    }
    if ( typeof siteConfig !== 'object' )
    {
        throw new Error( 'siteConfig must be an object' );
    }

    const apiRequestUrl = siteConfig.domain + config.apiRequestUrl;
    let endpoints = config.apiRequestEndPoints;

    if ( siteConfig.extraEndPoints )
    {
        endpoints = [ ...siteConfig.extraEndPoints, ...endpoints ];
    }

    endpoints = addQueryStringToEndPoints( endpoints, siteConfig );

    return getAllPostsFromTheAPI( endpoints, apiRequestUrl, siteConfig )
        .then( createPagesObjectsArray )
        .then( pagesObjectsArray =>
        {
            if ( siteConfig.allow404 )
            {
                return getFileObject( siteConfig.domain +
                                            siteConfig.allow404, siteConfig )
                    .then( ( pageObject404 ) =>
                        retrieveAndWriteAssets( [ pageObject404 ],
                                                    siteConfig ) )
                    .then( () => pagesObjectsArray )
                    .catch( error => logger.error( error ) );
            }
            return pagesObjectsArray;
        } )
        .then( pagesObjectsArray =>
        {
            retrieveAndWriteAssets( pagesObjectsArray, siteConfig )
                .then( isAnArray => Promise.all( [
                    ...isAnArray,
                    writeAllPages( pagesObjectsArray, siteConfig )
                ] )
                .then( () =>
                {
                    rockFishClock.done( 'Generator' );

                    logger.info( 'updating current project symlink' );

                    const targetDirectory = config.outputDir +
                                                siteConfig.siteTargetDir;
                    const relativePath = path.relative( targetDirectory,
                                                        config.outputDir +
                                                        siteConfig.releaseDir );

                    logger.warn( relativePath );

                    // ensure the symlink is created + overridden
                    fs.symlink( relativePath, `${targetDirectory}/tmp`,
                        ( result ) =>
                        {
                            logger.info( 'fs doneee', result );

                            fs.rename( `${targetDirectory}/tmp`,
                                `${targetDirectory}/current-release`,
                                logger.info );
                        } );

                    return Promise.resolve();
                } ) )
                .catch( error => logger.error( error ) );

            return pagesObjectsArray;
        } );
};


export class RockfishServer
{
    constructor()
    {
        this.createServer();
    }

    /**
     * ## server
     *
     * creates a new hapi server at specified port and sets up the routing for
     * GET requests
     *
     * @return _Void_
     */
    createServer()
    {
        this.server = new Hapi.Server();
        this.server.connection( {
            port    : process.env.port || config.port,
            address : '127.0.0.1',
            host    : 'localhost'
        } );

        this.server.route(
            {
                method : 'GET',
                path   : '/rockfish',
                handler( requestHeaders, reply )
                {
                    if ( getConfig( requestHeaders.query ) )
                    {
                        rockFishClock = logger.startTimer();
                        start( getConfig( requestHeaders.query ) );
                        reply( 'Creating Static Files...' );
                    }
                    else
                    {
                        reply( 'invalid site' );
                    }
                }
            } );
        return null;
    }
}


export const setupServer = () =>
{
    const rockfish = new RockfishServer();

    rockfish.server.start( () =>
    {
        logger.info( 'Server running at:', rockfish.server.info.uri );
    } );
};
