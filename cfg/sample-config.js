const config =
    {
        // where to store the static files
        outputDir : '< OUTPUT DIR >',

        // assumes WP api
        apiRequestUrl : '/wp-json/wp/v2/',

        apiRequestEndPoints : [ 'pages', 'posts' ],

        // only if you're using polylang
        apiRequestLang : '/wp-json/polylang/v2/languages',

        // change filters on page/posts
        mainQueryString : 'per_page=100&parent=0',

        // httpauth
        authentication : { user: '< USERNAME >', pass: '< PASSWORD >' },

        port : 9424,

        // main subdomain
        www : {
            mainDomain : '<http://www.worpdress.site.with.API.com>',
            en         : {
                domain         : '<http://www.worpdress.site.with.API.com>',
                extraEndPoints : [
                    // array of custom endpoints to ping
                ]
            },
            // alternative lang provided by polylang
            pt : {
                domain        : '<http://www.worpdress.site.with.API.com>/pt',
                // array of page names to include
                includedPages : [],
                // array of page names to exclude
                excludedPages : [],
                // path to any 404 page
                allow404      : ''
            }
        },

        // an alternate subdomain for the server
        alpha_www : {
            mainDomain : '<http://alternative.wordpress.site.with.API.com'
            // ...
        }
    };

module.exports = config;
