/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import 'babel-polyfill';
// require( 'babel-polyfill' );

const rockfish = require( './rockfish' );

if ( process.env.NODE_ENV === 'development' )
{
    require( 'babel-register' );
}


rockfish.setupServer();
