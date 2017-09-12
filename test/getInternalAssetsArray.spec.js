import fetchMock                from 'fetch-mock';

import getInternalAssetsArray   from '../src/lib/getInternalAssetsArray';
import { htmlFileTypes }        from '../src/helpers';
import runBasicChecks           from './runBasicChecks';

describe( 'getInternalAssetsArray', () =>
{
    const func = getInternalAssetsArray;

    runBasicChecks( func );

    afterEach( () =>
    {
        fetchMock.restore();
    } );

    it( 'should throw an error if no staticPageObject is defined', () =>
    {
        expect( func ).to.throw( /staticPageObject/ );
    } );

    it( 'should throw an error if no siteConfig is defined', () =>
    {
        expect( () => func( 'ss' ) ).to.throw( /siteConfig/ );
    } );

    describe( 'it should return', () =>
    {
        it( 'an array when staticPageObject with empty body is passed',
        () =>
        {
            const staticPageObject = {
                body    : '',
                urlPath : '/solutions/'
            };

            expect( func( staticPageObject, {} ) )
                .to.be.an.instanceOf( Array );
        } );

        it( 'an array when staticPageObject.body has no asset files',
        () =>
        {
            const staticPageObject = {
                body    : '="/header.bsfiletype"',
                urlPath : '/solutions/'
            };

            const noLength = 0;

            expect( func( staticPageObject, {} ) )
                .to.be.an.instanceOf( Array );
            expect( func( staticPageObject, {} ) )
                .to.be.have.length( noLength );
        } );

        it( 'an array w/ length 2 when body has 2 assets', () =>
        {
            const type = htmlFileTypes[ 0 ];
            const two = 2;
            const staticPageObject = {
                body    : `="/header${type}"="/header${type}"`,
                urlPath : '/solutions/'
            };

            expect( func( staticPageObject, {} ) )
            .to.be.an.instanceOf( Array );
            expect( func( staticPageObject, {} ) ).to.be.have.length( two );
        } );

        it( 'throw error with binary files', () =>
        {
            const staticPageObject = {
                body    : '',
                urlPath : '/solutions/',
                binary  : true
            };

            expect( () => func( staticPageObject, {} ) )
                .to.throw( /binary/ );
        } );
    } );
} );
