/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import runBasicChecks   from './runBasicChecks';
import writeStaticFile  from '../src/lib/writeStaticFile';

describe( 'writeStaticFile', () =>
{
    const func = writeStaticFile;

    runBasicChecks( func );

    it( 'should throw when path is undefined', () =>
    {
        expect( func ).to.throw( /filePath/ );
    } );

    it( 'should throw when body is undefined', () =>
    {
        expect( () => func( 'x' ) ).to.throw( /body/ );
    } );

    it( 'should throw when path is not an string', () =>
    {
        expect( () => func( {} ) ).to.throw( /string/ );
    } );

    it( 'should throw when isBinary is not a bool', () =>
    {
        expect( () => func( 'la', 'la', 'la' ) ).to.throw( /bool/ );
    } );
} );
