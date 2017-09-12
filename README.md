# rockfish - 0.2.0

Generate static HTML files, (along with all dependencies ) from the Wordpress API!

## About

Built in nodejs. It runs a server on `localhost:9424` (by default), which can trigger generation of static HTML files from a wordpress site. (Or any API which returns a similar JSON structure of URLs).

Files are generated to a local `outputDir` (as specified in the `cfg/config.js`).

These files can then be served without having to hassle Wordpress's DB.
Speeding up the site, and securing your server!



## Initial Startup

Rockfish requires [yarn](https://yarnpkg.com).

1. `git clone git@github.com:sociomantic-tsunami/rockfish.git`

1. `yarn` installs dependencies

1. Setup a config file.

1. `yarn run build` compiles via babel


### Configuration
Create a `cfg/config.js` file in the vein of the `cfg/sample-config.js`.

* _outputDir_ is the location the generated files will be stored.


### Upstart

For production or local development, you can set rockfish to run on startup, to do this us pm2's upstart capabilities. (On production run as the `rockfish` user).

You can retrieve the generation command for this via `yarn run pm2 startup`.


## Using Rockfish

Once installed can currently trigger the api via making a request with a site configuration. `http://localhost:<port>/rockfish?env=<environment, eg www as from config >&site=<subsite (if using wordpress multisite)ß>`

eg: `curl 'http://localhost:9424/rockfish?env=cms&site=de'`. This will trigger site generation of the cms.de site as outlined in the config file.



### Output

Generated sites are output to the `outputDir` as a root. Sites should have a named subfolder to contain the generated output in the format: `static.cms.de` with `cms` representing a site grouping and `de` the domain as in the `config.js`.

Inside of this the full folder structure is built, with `releases` containing the previous site versions, and `current-release` a symlink pointing to the latest version.


## Development

1. `yarn run watch` runs nodemon and compiles via babel watch

1. Ensure you have `export NODE_ENV=development` in your `.bashrc`/`.zshrc`

1. `yarn run tdd` run mocha tests in continuous watch mode.

1. Start PM2 `yarn run pm2 start rockfish.json --env development`.

1. Check the logs `yarn run pm2 logs`



## Tests

`yarn run tdd` for watch or `yarn run test` to run once.



## FAQs

### How can I login to my site though?

#### Wordpress!

This is not a replacement for your wordpress installation, but it does let you separate it from the WWW.

You can have `yoursite.com` serving static files (regenerated as often as you like), while serve the CMS portion of Wordpress from a more secure (password protected? offline?) server.

### What about my dynamic content?

#### Simple!

Static site generation can be triggered every time you update content. So if you only want to show 'latest posts', this is not a problem.

More advanced dynamic sites, customising per user, or needing users to log in etc wont work with this. Sorry. Rockfish is a simple creature for the simple sites out there that want to negate Wordpress' basic bottlenecks of SQL/PHP and keep things more secure.




## Contributing

We gladly accept and review any pull-requests. Feel free! :heart:

This project adheres to the [Contributor Covenant](http://contributor-covenant.org/). By participating, you are expected to honor this code.

[Rockfish - Code of Conduct](https://github.com/sociomantic-tsunami/rockfish/blob/master/CODE_OF_CONDUCT.md)




# Changelog

[CHANGELOG.MD](https://github.com/sociomantic-tsunami/rockfish/blob/master/CHANGELOG.md)
