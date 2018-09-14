/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import fetchMock                from 'fetch-mock';

import getAllPostsFromTheAPI    from '../src/lib/getAllPostsFromTheAPI';
import runBasicChecks           from './runBasicChecks';

const fetchSuccessCode = 200;
// const fetchFailCode = 400;


describe( 'getAllPostsFromTheAPI', () =>
{
    runBasicChecks( getAllPostsFromTheAPI, true );
    // let stub;

    const func = getAllPostsFromTheAPI;

    // beforeEach( () =>
    // {
    //     stub = sinon.stub();
    //     rewire$getEndpointPostLinks( stub );
    // } );

    // afterEach( () =>
    // {
    //     restore();
    // } );

    describe( 'the promise', () =>
    {
        it( 'should reject when no arguments passed', () =>
        expect( func() ).to
            .eventually.be.rejectedWith( 'At least one endpoint required' )
            .and.be.an.instanceOf( Error ) );

        it( 'should not throw', () =>
            expect( func( [ 'woo' ], 'ERROR', {} ) )
            .to.eventually.not.throw );
    } );

    xit( 'should call fetch once', () =>
     {
        fetchMock.get( '*', fetchSuccessCode );
        func( 'lalala', 'xxx' );
        expect( fetchMock.called() ).to.be.true;
        fetchMock.restore();
    } );
} );
