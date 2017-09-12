import createAssetsArray    from '../src/lib/createAssetsArray';
import runBasicChecks       from './runBasicChecks';

describe( 'createAssetsArray', () =>
{
    const func = createAssetsArray;
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
} );
