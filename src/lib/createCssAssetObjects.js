/**
 * Create objects for all css assets
 * @param {Array} cssAssets  Array of links to CSS assets
 * @param {Object} siteConfig site config object
 *
 * @return Promise fulfilling the objects array
 */

import getFileObject    from './getFileObject';
import { logger }       from '../helpers';


logger.info( `Current user: ${process.env.USER}` );

const createCssAssetObjects = ( cssAssets, siteConfig ) =>
{
    if ( !cssAssets )
    {
        throw new Error( 'cssAssets must be defined' );
    }
    if ( !Array.isArray( cssAssets ) )
    {
        throw new Error( 'cssAssets must be an array' );
    }

    if ( !siteConfig )
    {
        throw new Error( 'siteConfig must be defined' );
    }
    if ( typeof siteConfig !== 'object' )
    {
        throw new Error( 'siteConfig must be an object' );
    }

    logger.info( 'Creating CSS assets objects' );

    const cssObjectsArray =
        cssAssets.map( asset => getFileObject( asset, siteConfig ) );

    return Promise.all( cssObjectsArray );
};

export default createCssAssetObjects;
