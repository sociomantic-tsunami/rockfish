/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import createCssAssetsArray     from '../src/lib/createCssAssetsArray';
import runBasicChecks           from './runBasicChecks';

describe( 'createCssAssetsArray', () =>
{
    const func = createCssAssetsArray;
    runBasicChecks( func );

    it( 'should throw when cssAsset is undefined', () =>
    {
        expect( func ).to.throw( /cssAsset/ );
    } );

    it( 'should throw when cssAsset is not an object', () =>
    {
        expect( () => func( 'lala' ) ).to.throw( /object/ );
    } );

    it( 'should throw when siteConfig is undefined', () =>
    {
        expect( () => func( [] ) ).to.throw( /siteConfig/ );
    } );

    it( 'should throw when siteConfig is not an object', () =>
    {
        expect( () => func( [], 'lala' ) ).to.throw( /object/ );
    } );
} );
