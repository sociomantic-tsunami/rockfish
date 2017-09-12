import { getConfig }    from '../src/helpers';
import runBasicChecks   from './runBasicChecks';

describe( 'getConfig', () =>
{
    const func = getConfig;

    runBasicChecks( func );

    it( 'should return an object when passed an object', () =>
    {
        // const query = { env: 'de',  site: 'de' };
        const query = 'env=cms&site=de';

        expect( getConfig( query ) ).to.be.an.object;
    } );
} );
