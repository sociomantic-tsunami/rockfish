/**
 * ## writeStaticFile
 *
 * writes the body of a page given into a static
 * file with the path given
 *
 * @param {String} filePath of the page
 * @param {String} body of the page
 * @param {Boolean} isBinary is the data binary data?
 *
 * @return {Object} exists
 */

import filendir     from 'filendir';

import config       from '../../cfg/config';
import { logger }   from '../helpers';


logger.info( `Current user: ${process.env.USER}` );

const writeStaticFile = ( filePath, body, isBinary ) =>
{
    if ( !filePath )
    {
        throw new Error( 'writeStaticFile:: filePath must be defined' );
    }
    if ( typeof filePath !== 'string' )
    {
        throw new Error( 'writeStaticFile:: filePath must be a string' );
    }

    if ( !body )
    {
        throw new Error( 'writeStaticFile:: body must be defined' );
    }
    if ( isBinary && typeof isBinary !== 'boolean' )
    {
        throw new Error( 'writeStaticFile:: isBinary must be a boolean' );
    }

    logger.verbose( 'File: ', filePath, ' is binary? ', isBinary );

    const writePath = config.outputDir + filePath;
    let cleanPath = writePath.split( '?' )[ 0 ];

    cleanPath = decodeURIComponent( cleanPath );

    let enc = 'utf8';

    if ( isBinary )
    {
        enc = 'binary';
    }

    return filendir.writeFile( cleanPath, body, enc, ( error ) =>
    {
        if ( error )
        {
            logger.error( 'WriteFile: ', error );
            return Promise.reject( error );
        }

        logger.verbose( `written: ${cleanPath}` );
        return Promise.resolve();
    } );
};

export default writeStaticFile;
