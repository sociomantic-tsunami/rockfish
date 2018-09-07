/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## createAssetsArray
 *
 * Creates an array of all assets from all pages
 *
 * @param {Array} pagesObjectsArray array of page Objects
 * @param {Object} siteConfig site configuration object
 *
 * @return {Array} assetsArray
 */

import _                        from 'lodash';

import createCssAssetObjects    from './createCssAssetObjects';
import createCssAssetsArray     from './createCssAssetsArray';
import getInternalAssetsArray   from './getInternalAssetsArray';
import { logger }               from '../helpers';


logger.info( `Current user: ${process.env.USER}` );

const createAssetsArray = ( pagesObjectsArray, siteConfig ) =>
{
    if ( !pagesObjectsArray )
    {
        throw new Error( 'pagesObjectsArray must be defined' );
    }
    if ( !Array.isArray( pagesObjectsArray ) )
    {
        throw new Error( 'pagesObjectsArray must be an array' );
    }

    if ( !siteConfig )
    {
        throw new Error( 'siteConfig must be defined' );
    }
    if ( typeof siteConfig !== 'object' )
    {
        throw new Error( 'siteConfig must be an object' );
    }

    logger.verbose( 'Creating Assets Array' );

    let assetsArray = [];

    pagesObjectsArray.forEach( ( page ) =>
    {
        logger.debug( 'Cleaning HTML of page', page.urlPath );

        const pageAssets = getInternalAssetsArray( page, siteConfig );
        const noPageAssets = 0;
        if ( Array.isArray( pageAssets ) && pageAssets.length > noPageAssets )
        {
            assetsArray = Array.concat( assetsArray, pageAssets );
        }
    } );

    const uniqAssetsArray = _.uniq( assetsArray );

    const cssFilter = ( urlString ) => urlString.match( /\.css/g );

    const cssAssets = uniqAssetsArray.filter( cssFilter );

    return createCssAssetObjects( cssAssets, siteConfig )
        .then( cssObjectsArray =>
        {
            logger.debug( 'All CSS files retrieved', uniqAssetsArray );

            let finalArray = uniqAssetsArray;

            const internalCssAssets =
                cssObjectsArray.map( asset => createCssAssetsArray(
                                                    asset,
                                                    siteConfig ) );

            internalCssAssets.forEach( assets =>
            {
                finalArray = [ ...finalArray, ...assets ];
            } );

            finalArray = _.uniq( finalArray );

            return finalArray;
        } );
};

export default createAssetsArray;
