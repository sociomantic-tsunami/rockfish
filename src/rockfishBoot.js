import 'babel-polyfill';
// require( 'babel-polyfill' );

const rockfish = require( './rockfish' );

if ( process.env.NODE_ENV === 'development' )
{
    require( 'babel-register' );
}


rockfish.setupServer();
