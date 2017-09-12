import createCssAssetsArray     from '../src/lib/createCssAssetsArray';
import runBasicChecks           from './runBasicChecks';

describe( 'createCssAssetsArray', () =>
{
    const func = createCssAssetsArray;
    runBasicChecks( func );

    it( 'should throw when cssAsset is undefined', () =>
    {
        expect( func ).to.throw( /cssAsset/ );
    } );

    it( 'should throw when cssAsset is not an object', () =>
    {
        expect( () => func( 'lala' ) ).to.throw( /object/ );
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
