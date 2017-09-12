import base64 from 'base-64';

import config from '../../cfg/config';

const authUser = config.authentication.user;
const authPass = config.authentication.pass;

const authToken = base64.encode( `${authUser}:${authPass}` );

export default authToken;
