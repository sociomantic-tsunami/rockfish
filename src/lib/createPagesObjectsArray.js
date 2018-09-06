/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## createPagesObjectsArray
 *
 * Returs an array of page Objects created by getFileObject()
 *
 * @param {Array} linksObject includes array of every link of a page and
 * siteConfig
 *
 * @return {Array} pagesPromiseArray array of page Objects
 */

import getFileObject from './getFileObject';

const createPagesObjectsArray = ( linksObject ) =>
{
    if ( !linksObject )
    {
        return Promise.reject(
        new Error( 'linksObject required' ) );
    }

    if ( typeof linksObject !== 'object' )
    {
        return Promise.reject( TypeError( 'linksObject must be an object' ) );
    }

    const pagesPromiseArray = linksObject.merged.map( pageLink =>
        getFileObject( pageLink, linksObject.config ) );

    return Promise.all( pagesPromiseArray );
};

export default createPagesObjectsArray;
