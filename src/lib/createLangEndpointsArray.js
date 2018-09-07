/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## createLangEndpointsArray
 *
 * Returns the endpoints array including Polylang languages
 *
 * @param {Array} jsonSiteLanguages array of Polylang languages
 * @param {Array} endpointsArray array of endpoints to query
 *
 * @return {Array} updatedEndpointsArray includes array of every endpoint with
 * polylang languages
 */
const createLangEndpointsArray = ( jsonSiteLanguages, endpointsArray ) =>
{
    // if ( jsonSiteLanguages )
    // {
    //     throw new Error( 'jsonSiteLanguages must be defined' );
    // }
    if ( !Array.isArray( jsonSiteLanguages ) )
    {
        throw new Error( 'jsonSiteLanguages must be an array' );
    }
    if ( !endpointsArray )
    {
        throw new Error( 'endpointsArray must be defined' );
    }
    if ( !Array.isArray( endpointsArray ) )
    {
        throw new Error( 'endpointsArray must be an array' );
    }

    let updatedEndpointsArray = [];

    endpointsArray.forEach( ( endpoint ) =>
    {
        const endPoints = jsonSiteLanguages.map( ( siteLang ) =>
        {
            const langEndPoints = `${endpoint}&lang=${siteLang}`;
            return langEndPoints;
        } );

        updatedEndpointsArray = [ ...updatedEndpointsArray, ...endPoints ];
    } );

    return updatedEndpointsArray;
};

export default createLangEndpointsArray;
