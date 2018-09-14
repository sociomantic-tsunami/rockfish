/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## getFileObject
 *
 * requests the content of the link given and creates the page object
 *
 * @param {String} link of the page/file to get the content
 * @param {Object} siteConfig site configuration object
 *
 * @return {Object} staticPageObject containing page Body and path
 */

import 'isomorphic-fetch';
import { authToken, binaryAssets, logger }  from '../helpers';
import extractFileType                      from './extractFileType';

logger.info( `Current user: ${process.env.USER}` );


const getFileObject = ( link, siteConfig ) =>
{
    logger.verbose( 'Getting File: ', link );

    if ( !link )
    {
        return Promise.reject(
        new Error( 'link must be defined' ) );
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
    return fetch( link, payload ).then( ( response ) =>
    {
        const succesfulResponseStatus = 200;
        let acceptableLink = false;
        const linkFileType = extractFileType( link );

        logger.data( `Gotten ${link} response... status:`, response.status );

        if ( response.status === succesfulResponseStatus ||
             ( link.indexOf( siteConfig.allow404 ) >= 0 ) )
        {
            let domain = siteConfig.domain;
            if ( link.indexOf( `${siteConfig.domain}/` ) === -1 )
            {
                domain = siteConfig.mainDomain;
            }
            const urlPath = link.replace( domain, '' );

            const acceptableAssetTypes = binaryAssets;

            if ( typeof linkFileType !== 'undefined' )
            {
                acceptableLink = acceptableAssetTypes
                                                .includes( `.${linkFileType}` );
            }

            if ( link && acceptableLink )
            {
                return response.buffer().then( buffer =>
                    {
                    const staticPageObject = {
                        body   : buffer,
                        urlPath,
                        binary : true
                    };

                    return Promise.resolve( staticPageObject );
                } );
            }

            return response.text().then( text =>
            {
                logger.verbose( `${link} is a text file` );
                const staticPageObject = {
                    body : text,
                    urlPath
                };
                return Promise.resolve( staticPageObject );
            } );
        }

        logger.error( `Bad Response ${response.status}` );
        return Promise.resolve();
    } );
};

export default getFileObject;
