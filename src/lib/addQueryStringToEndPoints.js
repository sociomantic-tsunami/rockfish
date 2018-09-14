/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## addQueryStringToEndPoints
 *
 * adds the query string param( post_per_page ) to every
 * api request endpoint

 * @param {Array} endpoints list of endpoints to query
 * @param {Object} siteConfig site configuration object
 *
 * @return {Array} updatedEndPoints with query string
 */

import config       from '../../cfg/config';
import { logger }   from '../helpers';


logger.info( `Current user: ${process.env.USER}` );

const addQueryStringToEndPoints = ( endpoints, siteConfig ) =>
{
    logger.verbose( 'adding QueryStringToEndPoints' );

    const updatedEndPoints = [];

    const query = siteConfig.queryString ? siteConfig.queryString :
                                                         config.mainQueryString;

    endpoints.forEach( ( endpoint, i ) =>
    {
        updatedEndPoints[ i ] = `${endpoint}?${query}`;
    } );

    return updatedEndPoints;
};

export default addQueryStringToEndPoints;
