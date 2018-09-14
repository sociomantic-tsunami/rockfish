/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import createLangEndpointsArray from '../src/lib/createLangEndpointsArray';
import runBasicChecks           from './runBasicChecks';


describe( 'createLangEndpointsArray', () =>
{
    const func = createLangEndpointsArray;

    runBasicChecks( func );

    it( 'should throw when jsonSiteLanguages is not an array', () =>
    {
        expect( () => func( 'string' ) ).to.throw( /jsonSiteLanguages/ );
    } );

    it( 'should throw an error if no endpointsArray is defined', () =>
    {
        expect( () => func( [] ) ).to.throw( /endpointsArray/ );
    } );
    it( 'should throw when endpointsArray is not an array', () =>
    {
        expect( () => func( [], {} ) ).to.throw( /endpointsArray/ );
    } );

    it( 'should return an array', () =>
    {
        const languages = [];
        const endPoints = [];

        expect( func( languages, endPoints ) ).to.be.an.instanceOf( Array );
    } );

    it( 'should return an array with all endpoints in all languages', () =>
    {
        const languages = [ 'en', 'pl', 'de' ];
        const endPoints = [ 'pages', 'posts' ];

        const languageArray = func( languages, endPoints );

        expect( languageArray )
            .to.have.length( languages.length * endPoints.length );

        expect( languageArray[ 0 ] ).to.be.equal( 'pages&lang=en' );
        expect( languageArray[ 5 ] ).to.be.equal( 'posts&lang=de' );
    } );
} );
