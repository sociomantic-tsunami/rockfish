import fetchMock                from 'fetch-mock';

import runBasicChecks           from './runBasicChecks';
import createAllPostObject      from '../src/lib/createAllPostObject';
import {
    rewire as rewire$getEndpointPostLinks,
    restore as restore$getEndpointPostLinks
} from '../src/lib/getEndpointPostLinks';
import {
    rewire as rewire$addExtraPost,
    restore as restore$addExtraPost
} from '../src/lib/addExtraPost';

const fetchSuccessCode = 200;

describe( 'createAllPostObject', () =>
{
    const func = createAllPostObject;
    runBasicChecks( func, true );

    let stubGetEndpointPostLinks;
    let stubAddExtraPost;

    const callBackfunc = function test()
    {};

    beforeEach( () =>
    {
        stubGetEndpointPostLinks = sinon.stub();
        stubAddExtraPost = sinon.stub();
        rewire$getEndpointPostLinks( stubGetEndpointPostLinks );
        rewire$addExtraPost( stubAddExtraPost );
    } );

    afterEach( () =>
    {
        restore$getEndpointPostLinks();
        restore$addExtraPost();
    } );

    it( 'should reject when no arguments passed', () =>
    {
        expect( func() ).to
            .eventually.be.rejectedWith( 'At least one endpoint required' )
                .and.be.an.instanceOf( Array );
    } );

    describe( 'the promise', () =>
    {
        it( 'should resolve to an object', () =>
        {
            expect( func( [ 'woo' ], 'DDD', {}, callBackfunc() ) )
                .to.eventually.be.an.Object;
        } );

        xit( 'should resolve to an object with prop “merged”', () =>
        {
            fetchMock.get( '*', fetchSuccessCode );
            expect( func( [ 'woo' ], 'BBB', {}, callBackfunc() ) )
                .to.eventually.have.property( 'merged' );

            fetchMock.restore();
        } );

        describe( '“merged” prop', () =>
        {
            xit( 'should be an array', () =>
            {
                fetchMock.get( '*', fetchSuccessCode );
                return func( [ 'woo' ], 'CCC', { domain: 'boom' },
                                                            callBackfunc() )
                    .then( obj =>
                    {
                        expect( obj.merged ).to.be.instanceOf( Array );
                        fetchMock.restore();
                    } );
            } );


            xit( 'should only contain strings', () =>
            {
                stubGetEndpointPostLinks = sinon.stub()
                    .returns( [ 'fakeLink' ] );

                rewire$getEndpointPostLinks( stubGetEndpointPostLinks );

                return func( [ 'woo/json' ],
                    'cms.socio.com/de/api',
                    { domain: 'cms.socio.com/de' },
                    callBackfunc() )
                    .then( obj =>
                    {
                        expect( stubGetEndpointPostLinks ).to.be.calledOnce;
                        expect( obj.merged ).to.contain( 'fakeLink' );

                        restore$getEndpointPostLinks();
                    } );
            } );


            // it( 'should contain the site root index.html', () =>
            // {
            //     stub = sinon.stub().returns( [ 'fakeLink' ] );
            //     getEndpointPostLinks( stub );

            //     return func( [ 'woo/json' ],
            //         'cms.socio.com/de/api',
            //         { domain: 'cms.socio.com/de' },
            //         function(){}
            //     )
            //     .then( obj =>
            //     {
            //         expect( stub ).to.be.calledOnce;
            //     expect( obj.merged ).to.contain( 'cms.socio.com/de' );

            //         restore();
            //     } );
            // } );
        } );
    } );

    // it( 'should call getEndpointsPostLinks once with one endpoint', () =>
    // {
    //     stub = sinon.stub().returns( [ 'fakeLink' ] );
    //     getEndpointPostLinks( stub );
    //
    //     return func( [ 'woo' ], 'DDD', {}, callBackfunc() )
    //             .then( () =>
    //             {
    //                 expect( stub ).to.have.been.calledOnce;
    //             } );
    // } );
    //
  // it( 'should call getEndpointsPostLinks twice with two endpoints', () =>
    // {
    //     stub = sinon.stub().returns( [ 'fakeLink' ] );
    //     getEndpointPostLinks( stub );
    //
    //     return func( [ 'woo', 'llll' ], 'DDD', {}, callBackfunc() )
    //             .then( () =>
    //             {
    //                 expect( stub ).to.have.been.calledTwice;
    //             } );
    // } );
} );
