/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import addExtraPost     from '../src/lib/addExtraPost';
import runBasicChecks   from './runBasicChecks';


describe( 'addExtraPost', () =>
{
    const func = addExtraPost;

    runBasicChecks( func );

    // it( 'should return an array', () =>
    // {
    //     const defaultPosts = [];
    //     const posts = [];
    //
    //     expect( func( defaultPosts, posts ) ).to.be.an.instanceOf( Array );
    // } );
    it( 'should return an array when passed a object', () =>
    {
        const allPosts = [ 'this', 'is', 'an', 'array' ];
        const siteConfig = {
            domain        : 'de',
            includedPages : [ 'page' ]
        };

        expect( func( allPosts, siteConfig ) ).to.be.an.instanceOf( Array );
    } );
} );
