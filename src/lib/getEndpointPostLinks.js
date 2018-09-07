/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## getEndpointPostLinks
 *
 * request the content ( page links ) of every endpoint array item from the
 * WP REST API
 *
 * @param {String} URL WP API
 * @param {String} endpoint to query the API
 * @param {Object} siteConfig site configuration object
 *
 * @return {Array} JSON containing WP url's
 */

import 'isomorphic-fetch';
import { authToken, logger } from '../helpers';

logger.info( `Current user: ${process.env.USER}` );

const getEndpointPostLinks = ( URL, endpoint, siteConfig ) =>
{
    logger.info( `endpoint: ${URL}${endpoint}` );

    if ( !URL )
    {
        return Promise.reject(
        new Error( 'URL must be defined' ) );
    }
    if ( !endpoint )
    {
        return Promise.reject(
        new Error( 'endpoint must be defined' ) );
    }
    if ( !siteConfig )
    {
        return Promise.reject(
        new Error( 'siteConfig must be defined' ) );
    }

    const payload = {
        method  : 'GET',
        headers : {
            Authorization : `Basic ${authToken}`
        }
    };

    // eslint-disable-next-line compat/compat
    return fetch( URL + endpoint, payload )
        .then( ( response ) =>
        {
            const errorCode = 404;

            if ( response.status === errorCode )
            {
                logger.error( `${endpoint} doesn't exist` );
                return [];
            }
            return response.json();
        } )
        .then( ( json ) =>
            json.filter( ( item ) =>
                ( !siteConfig.excludedPages || ( siteConfig.excludedPages &&
                  !siteConfig.excludedPages.includes( item.slug ) ) )
            )
        )
        .then( json => json.map( item => item.link ) );
};

export default getEndpointPostLinks;
