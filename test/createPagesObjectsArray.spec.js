import createPagesObjectsArray  from '../src/lib/createPagesObjectsArray';
import runBasicChecks           from './runBasicChecks';

describe( 'createPagesObjectsArray', () =>
{
    const func = createPagesObjectsArray;
    runBasicChecks( func, true );

    it( 'should throw when linksObject is undefined', () =>
    expect( func() ).to
                .eventually.be.rejectedWith( /linksObject/ )
                .and.be.an.instanceOf( Error ) );

    it( 'should throw when linksObject is not an object', () =>
    expect( func( 'laaa' ) ).to
                    .eventually.be.rejectedWith( /object/ )
                    .and.be.an.instanceOf( TypeError ) );
} );
