import fetchMock        from 'fetch-mock';

import { binaryAssets } from '../src/helpers';
import getFileObject    from '../src/lib/getFileObject';
import runBasicChecks   from './runBasicChecks';

const fetchSuccessCode = 200;
const fetchFailCode = 400;

describe( 'getFileObject', () =>
{
    const func = getFileObject;

    runBasicChecks( func, true );

    afterEach( () =>
    {
        fetchMock.restore();
    } );

    it( 'should throw an error if no link is defined', () =>
    expect( func() ).to.be.rejectedWith( /link/ ) );

    it( 'should throw an error if no config is defined', () =>
    expect( func( 'ss' ) ).to.be.rejectedWith( /siteConfig/ ) );

    it( 'should call fetch once', () =>
    {
        const link = `http://tester.com/${Math.random()}`;
        const singleLinkCalled = 1;
        fetchMock.get( link, fetchSuccessCode );

        return func( link, {} ).then( () =>
        {
            expect( fetchMock.calls( link ) )
                .to.have.length( singleLinkCalled );
        } );
    } );

    // should always resolve for upper Promise.all calls.
    it( 'should not reject on non failed response from fetch', () =>
    {
        const link = `http://tester.com/${Math.random()}`;
        fetchMock.get( link, fetchFailCode );

        return expect( func( link, {} ) ).to.eventually.be.resolved;
    } );


    describe( 'it should resolve', () =>
    {
        afterEach( () =>
        {
            fetchMock.restore();
        } );

        it( 'to an object', () =>
        {
            const link = `http://tester.com/${Math.random()}`;
            fetchMock.get( link, fetchSuccessCode );

            return expect( func( link, {} ) )
                .to.eventually.be.an.instanceOf( Object );
        } );

        it( 'to an object with property body', () =>
        {
            const link = `http://tester.com/${Math.random()}`;
            fetchMock.get( link, fetchSuccessCode );

            return expect( func( link, {} ) )
                .to.eventually.have.property( 'body' );
        } );

        it( 'to an object with property urlPath', () =>
        {
            const link = `http://tester.com/${Math.random()}`;
            fetchMock.get( link, fetchSuccessCode );

            return expect( func( link, {} ) )
                .to.eventually.have.property( 'urlPath' );
        } );

        it( 'to an object w/ binary true if requesting binary assets', () =>
        {
            const acceptableAssetTypes = binaryAssets;

            const link = `http://tester.com/thing${acceptableAssetTypes[ 0 ]}`;
            fetchMock.get( link, fetchSuccessCode );

            return expect( func( link, {} ) )
                .to.eventually.have.property( 'binary' );
        } );

        it( 'to an object w/o binary set to true if not binaryAsset', () =>
        {
            const link = `http://tester.com/${Math.random()}`;
            fetchMock.get( link, fetchSuccessCode );

            return expect( func( link, {} ) )
                .to.eventually.not.have.property( 'binary' );
        } );
    } );

    xit( 'should return text with files' );
} );
