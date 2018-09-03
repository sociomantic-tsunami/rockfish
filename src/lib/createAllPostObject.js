/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## createAllPostObject
 *
 * Returns promise all that resolves to an array of post objects
 *
 * @param {Array} endpointsArray array of endpoints to query
 * @param {String} URL WP Rest API
 * @param {Object} siteConfig site configuration object
 * @param {Object} resolve promise
 *
 * @return {Object} mergedObject includes array of every link of a page and
 * siteConfig
 */

import addExtraPost             from './addExtraPost';
import getEndpointPostLinks     from './getEndpointPostLinks';


const createAllPostObject = ( endpointsArray = [], URL, siteConfig, resolve ) =>
{
    const allPosts = [];

    const endpointPromisesArrays = endpointsArray.map( ( endpoint ) =>
                        getEndpointPostLinks( URL, endpoint, siteConfig ) );

    return Promise.all( endpointPromisesArrays ).then( ( endpointJSONArray ) =>
    {
        endpointJSONArray.forEach( r =>
        {
            allPosts.push( ...r );
        } );

        const mergedObject = {
            merged : addExtraPost( allPosts, siteConfig ),
            config : siteConfig
        };
        return resolve( mergedObject );
    } );
};

export default createAllPostObject;
