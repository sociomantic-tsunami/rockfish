import { cleanHtml }    from '../src/helpers';
import runBasicChecks   from './runBasicChecks';

describe( 'cleanHtml', () =>
{
    const func = cleanHtml;

    runBasicChecks( func );

    it( 'should return a string when passed a string', () =>
    {
        const html = 'a string';
        const siteConfig = { domain: 'de' };

        expect( func( html, siteConfig ) ).to.be.a.string;
    } );
} );
