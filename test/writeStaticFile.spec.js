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
