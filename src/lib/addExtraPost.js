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
