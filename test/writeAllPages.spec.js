/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import {
    rewire as rewire$cleanHtml,
    restore as restore$cleanHtml
} from '../src/helpers/cleanHtml';
import {
    rewire as rewire$writeStaticFile,
    restore as restore$writeStaticFile
} from '../src/lib/writeStaticFile';
import runBasicChecks   from './runBasicChecks';
import writeAllPages    from '../src/lib/writeAllPages';

describe( 'writeAllPages', () =>
{
    const func = writeAllPages;

    runBasicChecks( func );


    it( 'should throw when pagesObjectsArray is undefined', () =>
    {
        expect( func ).to.throw( /pagesObjectsArray/ );
    } );

    it( 'should throw when pagesObjectsArray is not an array', () =>
    {
        expect( () => func( {} ) ).to.throw( /array/ );
    } );


    it( 'should throw when siteConfig is undefined', () =>
    {
        expect( () => func( [] ) ).to.throw( /siteConfig/ );
    } );

    it( 'should throw when siteConfig is not an object', () =>
    {
        expect( () => func( [], 'lala' ) ).to.throw( /object/ );
    } );


    it( 'should call cleanHtml', () =>
    {
        const stub = sinon.stub().returns( Promise.resolve() );
        rewire$cleanHtml( stub );
        rewire$writeStaticFile( sinon.stub() );

        func( [ 'one' ], {} );

        expect( stub ).to.have.been.calledOnce;
        restore$cleanHtml();
    } );


    it( 'should call writeStaticFile once', () =>
    {
        const stub = sinon.stub().returns( Promise.resolve() );
        rewire$writeStaticFile( stub );
        rewire$cleanHtml( sinon.stub() );

        func( [ 'one' ], {} );

        expect( stub ).to.have.been.calledOnce;
        restore$writeStaticFile();
    } );
} );
