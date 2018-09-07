/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-unused-expressions */
/* eslint-disable promise/always-return */

const runBasicChecks = ( func, isPromise ) =>
{
    it( 'should exist', () =>
    {
        expect( func ).to.exist;
    } );

    it( 'should be a function', () =>
    {
        expect( func ).to.be.a.function;
    } );

    if ( isPromise )
    {
        xit( 'should return a promise', () =>
        {
            // const obj = rockfish.getAllPostsFromTheAPI();
            // expect( Promise.resolve( obj ) ).to.be.equal( obj );
        } );

        it( 'shouldn’t throw an error ever', () =>
        {
            expect( func ).to.not.throw( Error );
        } );
    }
};

export default runBasicChecks;
