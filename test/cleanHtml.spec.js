/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

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
