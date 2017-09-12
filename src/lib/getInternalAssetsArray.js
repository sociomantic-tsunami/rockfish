/**
 * ## getInternalAssetsArray
 *
 * reads the content of the body of pages and creates and array
 * of internally linked src and href
 *
 * @param {Object} staticPageObject body of a page for parsing
 * @param {Object} siteConfig site configuration object
 *
 * @return {Array} filteredMatches
 */

import { htmlFileTypes, logger }    from '../helpers';
import extractFileType              from './extractFileType';

logger.info( `Current user: ${process.env.USER}` );


const getInternalAssetsArray = ( staticPageObject, siteConfig ) =>
{
    logger.verbose( 'Getting internal assets array' );

    if ( !staticPageObject )
    {
        throw new Error( 'staticPageObject must be defined' );
    }
    if ( staticPageObject.binary )
    {
        throw new Error( 'binary data is not acceptable.' );
    }
    if ( !siteConfig )
    {
        throw new Error( 'siteConfig must be defined' );
    }

    const acceptableAssetTypes = htmlFileTypes;

    const allMatchesRegex =
        new RegExp( `=["|'](${siteConfig.domain})?/([^/].*?)["|']`, 'g' );

    const allMatches = staticPageObject.body.match( allMatchesRegex );
    const noMatches = 0;
    let acceptableAsset = false;

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
                const assetPath = asset.replace( allMatchesRegex, '$2' );
                return `${siteConfig.mainDomain}/${assetPath}`;
            }

            return false;
        } );

        const filteredMatches = matches.filter( asset => asset );
        return filteredMatches;
    }

    return [];
};

export default getInternalAssetsArray;
