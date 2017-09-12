import createCssAssetObjects    from '../src/lib/createCssAssetObjects';
import runBasicChecks           from './runBasicChecks';

describe( 'createCssAssetObjects', () =>
{
    const func = createCssAssetObjects;
    runBasicChecks( func );

    it( 'should throw when cssAssets is undefined', () =>
    {
        expect( func ).to.throw( /cssAssets/ );
    } );

    it( 'should throw when cssAssets is not an array', () =>
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
