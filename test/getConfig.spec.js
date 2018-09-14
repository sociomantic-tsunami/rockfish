/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

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
