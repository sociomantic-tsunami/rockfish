/**
 * ## writeAllPages
 *
 * writes the static file of every single page after
 * cleaning the internal links ( Assets )
 *
 * @param {Array} pagesObjectsArray array of page Objects
 * @param {Object} siteConfig config object for this domain
 *
 * @return _Void_
 */


import path                     from 'path';

import { cleanHtml, logger }    from '../helpers';
import writeStaticFile          from './writeStaticFile';

logger.info( `Current user: ${process.env.USER}` );

const writeAllPages = ( pagesObjectsArray, siteConfig ) =>
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

    logger.info( 'Writing all pages' );
    pagesObjectsArray.forEach( page =>
    {
        const pathToWrite = path.format(
            {
                dir  : siteConfig.releaseDir + page.urlPath,
                base : 'index.html'
            } );

        logger.info( 'should be Writing ', pathToWrite );
        const finalHtml = cleanHtml( page.body, siteConfig );

        writeStaticFile( pathToWrite, finalHtml );
    } );
    return Promise.resolve();
};

export default writeAllPages;
