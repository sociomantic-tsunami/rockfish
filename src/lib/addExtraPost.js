/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/**
 * ## addExtraPost
 *
 * Returns an array containing default and extra posts
 *
 * @param {Array} allPosts array of posts
 * @param {Object} siteConfig site configuration object
 *
 * @return {Array} allPostsUpdated array of all posts
 */
const addExtraPost = ( allPosts, siteConfig ) =>
{
    let defaultPosts = [ siteConfig.domain ];

    if ( siteConfig.includedPages )
    {
        const extraPosts = siteConfig.includedPages.map( ( includePage ) =>
            `${siteConfig.domain}/${includePage}/` );

        defaultPosts = [ ...defaultPosts, ...extraPosts ];
    }

    const allPostsUpdated = [ ...defaultPosts, ...allPosts ];

    return allPostsUpdated;
};

export default addExtraPost;
