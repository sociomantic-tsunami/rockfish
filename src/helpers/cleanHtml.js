/**
 * ## cleanHtml
 *
 * removes the mainDomain from all links in the page body
 * to make them relative to the static domain
 *
 * @param {String} html html to clean
 * @param {Object} siteConfig site configuration object

 * @return {String} clean html
 */

import logger from './logger';

logger.info( `Current user: ${process.env.USER}` );

const cleanHtml = ( html, siteConfig ) =>
{
    logger.verbose( 'Cleaning HTML' );

    const re = new RegExp( `(=("|'))${siteConfig.domain}/`, 'g' );
    return html.replace( re, '$1/' );
};

export default cleanHtml;
