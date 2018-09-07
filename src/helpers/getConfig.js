/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## getConfig
 *
 *  gets the correct configuration from the config file
 *
 * @param {Object} query string object
 *
 * @return {Object} config object for the current site
 */

import config from '../../cfg/config';

const getConfig = ( query ) =>
{
    const { env, site } = query;


    const siteConfig = config[ env ] ? config[ env ][ site ] : undefined;

    if ( siteConfig )
    {
        siteConfig.env = env;
        siteConfig.site = site;
        siteConfig.mainDomain = config[ env ].mainDomain;
        siteConfig.timestamp = new Date().toISOString();
        siteConfig.siteTargetDir =
            `static.${siteConfig.env}.${siteConfig.site}`;
        siteConfig.releaseDir =
            `${siteConfig.siteTargetDir}/releases/${siteConfig.timestamp}/`;
    }

    return siteConfig;
};

export default getConfig;
