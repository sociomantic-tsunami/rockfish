/**
 * ## getAllPostsFromTheAPI
 *
 * Returns an promise that resolves to an array of post objects
 *
 * @param {Array} endpointsArray array of endpoints to query
 * @param {String} URL WP Rest API
 * @param {Object} siteConfig site configuration object
 *
 * @return {Object} Promise that resolve an object containing all posts
 */

import 'isomorphic-fetch';
import { authToken, logger }    from '../helpers';
import config                   from '../../cfg/config';
import createAllPostObject      from './createAllPostObject';
import createLangEndpointsArray from './createLangEndpointsArray';

logger.info( `Current user: ${process.env.USER}` );

const getAllPostsFromTheAPI = ( endpointsArray = [], URL, siteConfig ) =>
{
    logger.verbose( 'Getting All Posts From API' );

    if ( !endpointsArray.length )
    {
        return Promise.reject(
        new Error( 'At least one endpoint required' ) );
    }
    if ( !URL.length )
    {
        return Promise.reject(
        new Error( 'URL must be defined' ) );
    }
    if ( !siteConfig )
    {
        return Promise.reject(
        new Error( 'siteConfig must be defined' ) );
    }

    return new Promise( ( resolve, reject ) =>
    {
        const payload = {
            method  : 'GET',
            headers : {
                Authorization : `Basic ${authToken}`
            }
        };

        let finalEndpointsArray = endpointsArray;

        // eslint-disable-next-line compat/compat
        fetch( siteConfig.domain + config.apiRequestLang, payload )
            .then( response => response.json() )
            .then( ( jsonSiteLang ) =>
            {
                const errorCode = 404;
                if ( typeof jsonSiteLang.data !== 'undefined' &&
                                    jsonSiteLang.data.status === errorCode )
                {
                    logger.info( 'NO POLYLANG LANGUAGES' );
                }
                else
                {
                    finalEndpointsArray = createLangEndpointsArray(
                        jsonSiteLang, finalEndpointsArray );
                }
                return createAllPostObject( finalEndpointsArray, URL,
                                siteConfig, resolve );
            } )
            .catch( error => reject( error ) );
    } );
};

export default getAllPostsFromTheAPI;
