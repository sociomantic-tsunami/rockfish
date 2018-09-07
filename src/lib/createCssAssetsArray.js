/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * Generate an array of all the assets referenced in a CSS file
 * @param  {Object} cssAsset   CSS file as a Object
 * @param  {Object} siteConfig site config Object
 * @return {Array}            array of links of assets
 */

import { binaryAssets, logger } from '../helpers';
import extractFileType          from './extractFileType';

logger.info( `Current user: ${process.env.USER}` );


const createCssAssetsArray = ( cssAsset, siteConfig ) =>
{
    logger.info( 'Creating CSS assets array' );

    if ( !cssAsset )
    {
        throw new Error( 'cssAsset must be defined' );
    }
    if ( typeof cssAsset !== 'object' )
    {
        throw new Error( 'cssAsset must be an object' );
    }

    if ( !siteConfig )
    {
        throw new Error( 'siteConfig must be defined' );
    }
    if ( typeof siteConfig !== 'object' )
    {
        throw new Error( 'siteConfig must be an object' );
    }

    const acceptableAssetTypes = binaryAssets;
    const allMatches = cssAsset.body.match( /url\(["']?(?!data)([^)"']+)/g );
    const noMatches = 0;
    let acceptableAsset = false;
    logger.info( allMatches );

    if ( allMatches && allMatches.length > noMatches )
    {
        const matches = allMatches.map( ( asset ) =>
        {
            const assetFileType = extractFileType( asset );

            if ( typeof assetFileType !== 'undefined' )
            {
                acceptableAsset = acceptableAssetTypes
                                            .includes( `.${assetFileType}` );
            }

            if ( asset && acceptableAsset )
            {
                let assetPath =
                    asset.replace( /url\(["']?(?!data)([^)"']+)/g, '$1' );

                if ( !( assetPath[ 0 ] === '/' ) )
                {
                    const cssAssetArray = cssAsset.urlPath.split( '/' );
                    cssAssetArray.pop();
                    assetPath = `${cssAssetArray.join( '/' )}/${assetPath}`;
                }

                return siteConfig.mainDomain + assetPath;
            }

            return false;
        } );

        const filteredMatches = matches.filter( asset => asset );
        return filteredMatches;
    }

    // return empty array
    return [];
};

export default createCssAssetsArray;
