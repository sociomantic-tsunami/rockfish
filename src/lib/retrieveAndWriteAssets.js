/**
 * ## retrieveAndWriteAssets
 *
 * gets assets from the body of every page and writes them
 * in a static files
 *
 * @param {Array} pagesObjectsArray array of page Objects
 * @param {Object} siteConfig site configuration object
 *
 * @return assets array promise => objects
 */


import createAssetsArray    from './createAssetsArray';
import getFileObject        from './getFileObject';
import { logger }           from '../helpers';
import writeStaticFile      from './writeStaticFile';

logger.info( `Current user: ${process.env.USER}` );

const retrieveAndWriteAssets = ( pagesObjectsArray, siteConfig ) =>
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

    // console.log('PAGESOBJECT', pagesObjectsArray);

    return createAssetsArray( pagesObjectsArray, siteConfig )
        .then( ( assetsArray ) =>
        {
            // console.log('ASSSSSETS ARRRAY', assetsArray);

            if ( siteConfig.allow404 )
            {
                assetsArray.push( siteConfig.domain + siteConfig.allow404 );
            }
            return assetsArray.map( asset => getFileObject( asset, siteConfig )
                .then( assetObject =>
                {
                    writeStaticFile(
                        siteConfig.releaseDir + assetObject.urlPath,
                        assetObject.body,
                        assetObject.binary );
                    return Promise.resolve();
                } ).catch( error =>
                {
                    logger.error( 'RetrieveAndWriteAssets failed with asset: ',
                        asset.urlPath, error );
                } ) );
        } );
};

export default retrieveAndWriteAssets;
