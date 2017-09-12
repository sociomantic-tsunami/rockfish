/* eslint-disable no-unused-expressions */
/* eslint-disable promise/always-return */
import * as rockfish from '../src/rockfish';
import {
    rewire as rewire$addQueryStringToEndPoints,
    restore as restore$addQueryStringToEndPoints
} from '../src/lib/addQueryStringToEndPoints';
import {
    rewire as rewire$createPagesObjectsArray,
    restore as restore$createPagesObjectsArray
} from '../src/lib/createPagesObjectsArray';
import {
    rewire as rewire$getAllPostsFromTheAPI,
    restore as restore$getAllPostsFromTheAPI
} from '../src/lib/getAllPostsFromTheAPI';
import {
    rewire as rewire$retrieveAndWriteAssets
} from '../src/lib/retrieveAndWriteAssets';
import {
    rewire as rewire$writeAllPages
} from '../src/lib/writeAllPages';
import runBasicChecks from './runBasicChecks';


describe( 'rockfish', () =>
{
    const el = new rockfish.RockfishServer();

    it( 'RockfishServer should exist', () =>
    {
        expect( el.server ).to.be.an( 'object' );
    } );

    describe( 'start rockfish', () =>
    {
        const func = rockfish.start;

        runBasicChecks( func );

        it( 'should throw when siteConfig is undefined', () =>
        {
            expect( func ).to.throw( /siteConfig/ );
        } );

        it( 'should throw when siteConfig is not an object', () =>
        {
            expect( () => func( 'lala' ) ).to.throw( /object/ );
        } );

        it( 'should call addQueryStringsToEndpoints once', () =>
        {
            const stub = sinon.stub()
                .returns( Promise.resolve( { aye: 'aye' } ) );
            rewire$addQueryStringToEndPoints( stub );

            func( {} );

            expect( stub ).to.have.been.calledOnce;
            restore$addQueryStringToEndPoints();
        } );

        it( 'should call getAllPostsFromTheAPI once', () =>
        {
            const stub = sinon.stub().returns( Promise.resolve( [] ) );
            rewire$getAllPostsFromTheAPI( stub );

            func( {} );

            expect( stub ).to.have.been.calledOnce;
            restore$getAllPostsFromTheAPI();
        } );

        it( 'should call createPagesObjectsArray once', () =>
        {
            const stub = sinon.stub().returns( Promise.resolve( [ 'once' ] ) );
            rewire$getAllPostsFromTheAPI( sinon.stub()
                .returns( Promise.resolve( [ 'endpointtttt' ] ) ) );
            rewire$createPagesObjectsArray( stub );
            rewire$retrieveAndWriteAssets( sinon.stub()
                .returns( Promise.resolve() ) );
            rewire$writeAllPages( sinon.stub() );

            return func( {} ).then( () =>
            {
                expect( stub ).to.have.been.calledOnce;
                restore$createPagesObjectsArray();
            } );
        } );
    } );
} );
