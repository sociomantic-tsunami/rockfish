/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */


// import rewire$createCssAssetObjects    from './createCssAssetObjects';
// import createCssAssetsArray     from './createCssAssetsArray';
// import getInternalAssetsArray   from './getInternalAssetsArray';

import extractFileType      from '../src/lib/extractFileType';
import runBasicChecks       from './runBasicChecks';


describe( 'extractFileType', () =>
{
    const func = extractFileType;
    runBasicChecks( func );

    it( 'should throw when link is undefined', () =>
    {
        expect( func ).to.throw( /link/ );
    } );

    it( 'should throw when link is not an string', () =>
    {
        expect( () => func( {} ) ).to.throw( /string/ );
    } );

    it( 'should throw when link is not an string', () =>
    {
        expect( () => func( {} ) ).to.throw( /string/ );
    } );

    it( 'should return file type as a string', () =>
    {
        expect( func( 'http://test.cn/2C4DC6_6_0.woff2' ) ).to.equal( 'woff2' );
    } );
} );
