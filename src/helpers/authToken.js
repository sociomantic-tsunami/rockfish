/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import base64 from 'base-64';

import config from '../../cfg/config';

const authUser = config.authentication.user;
const authPass = config.authentication.pass;

const authToken = base64.encode( `${authUser}:${authPass}` );

export default authToken;
