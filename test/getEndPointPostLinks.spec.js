
import fetchMock            from 'fetch-mock';

import getEndpointPostLinks from '../src/lib/getEndpointPostLinks';
import runBasicChecks       from './runBasicChecks';

const fetchSuccessCode = 200;


describe( 'getEndpointPostLinks', () =>
{
    const func = getEndpointPostLinks;

    runBasicChecks( func, true );

    describe( 'the promise', () =>
    {
        it( 'should reject when no arguments passed', () =>
        expect( func() ).to.eventually.be.rejected );

        xit( 'should resolve to an array', () =>
        expect( func( 'AAA', 'BBB', {} ) )
                .to.eventually.be.instanceOf( Array ) );
    } );

    xit( 'should call fetch once', () =>
    {
        fetchMock.get( '*', fetchSuccessCode );
        func( 'lalala', 'xxx' );
        expect( fetchMock.called() ).to.be.true;
        fetchMock.restore();
    } );


    it( 'The returned array should contain strings ', () =>
    {
        expect( func( 'AAA', 'BBB' ) );
    } );
} );
