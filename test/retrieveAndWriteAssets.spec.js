import retrieveAndWriteAssets   from '../src/lib/retrieveAndWriteAssets';
import {
    rewire as rewire$createAssetsArray,
    restore as restore$createAssetsArray
} from '../src/lib/createAssetsArray';
import {
    rewire as rewire$getFileObject,
    restore as restore$getFileObject
} from '../src/lib/getFileObject';
import {
    rewire as rewire$writeStaticFile
} from '../src/lib/writeStaticFile';
import runBasicChecks           from './runBasicChecks';

describe( 'retrieveAndWriteAssets', () =>
{
    const func = retrieveAndWriteAssets;
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

    it( 'should call createAssetsArray once ', () =>
    {
        const spiedCreateAssetsArray = sinon.stub()
            .returns( Promise.resolve( [ 'OurTestAsset!' ] ) );

        rewire$createAssetsArray( spiedCreateAssetsArray );
        rewire$getFileObject( sinon.stub().returns( Promise.resolve() ) );
        rewire$writeStaticFile( sinon.stub().returns( Promise.resolve() ) );

        return func( [ 'once' ], {} )
            .then( () =>
            {
                expect( spiedCreateAssetsArray ).to.be.calledOnce;
                restore$createAssetsArray();
            } );
    } );

    it( 'should call getFileObject twice with two assets', () =>
    {
        const spiedCreateAssetsArray = sinon.stub()
            .returns( Promise.resolve( [ 'asset!', 'asset1' ] ) );

        const spiedGetFileObject = sinon.stub()
                .returns( Promise.resolve( { aye: 'aye' } ) );

        rewire$createAssetsArray( spiedCreateAssetsArray );
        rewire$getFileObject( spiedGetFileObject );
        rewire$writeStaticFile( sinon.stub().returns( Promise.resolve() ) );

        return func( [ 'once' ], {} )
            .then( () =>
            {
                expect( spiedGetFileObject ).to.be.calledTwice;
                restore$getFileObject();
            } );
    } );

    xit( 'should catch any errors from getFileObject IMPORTANTE' );
} );
