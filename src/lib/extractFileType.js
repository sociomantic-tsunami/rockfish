/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint no-magic-numbers: "off"*/

/**
 * ## extractFileType
 *
 * extracts the file type from the page/file link
 *
 * @param {String} link of the page/file to get the content
 *
 * @return {String} file type
 */
const extractFileType = ( link ) =>
{
    if ( !link )
    {
        throw new Error( 'link must be defined' );
    }
    if ( typeof link !== 'string' )
    {
        throw new Error( 'link must be a string' );
    }

    let linkCopy = link;

    if ( new RegExp( /['"]$/ ).test( linkCopy ) )
    {
        linkCopy = linkCopy.slice( 1, -1 );
    }

    const linkSplittedArray = linkCopy.split( '/' );
    let fileName = linkSplittedArray[ linkSplittedArray.length - 1 ];

    if ( fileName.indexOf( '?' ) >= 0 )
    {
        fileName = fileName.split( '?' )[ 0 ];
    }

    const fileNameArray = fileName.split( '.' );
    return fileNameArray[ fileNameArray.length - 1 ];
};

export default extractFileType;
