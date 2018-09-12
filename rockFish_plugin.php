<?php
/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */
?><?php
/*
Plugin Name: Rockfish Sync
Plugin URI: http://sociomantic.com/
Version: 0.0.1
Author: josh.wilson@sociomantic.com
*/




class Rockfish
{
    /**
     * A Unique Identifier
     */
    protected $plugin_slug;

    /**
     * A reference to an instance of this class.
     */
    private static $instance;

    /**
     * The array of templates that this plugin tracks.
     */
    protected $templates;

    /**
     * Returns an instance of this class.
     */
    public static function get_instance()
    {

            if( null == self::$instance ) {
                    self::$instance = new Rockfish();
            }

            return self::$instance;
    }

    public function rockfish__hook( $id, $post )
    {

        //TODO:
        // Trigger only updated files via a specific rockfish endpoint to grab only one file
        //
        // create curl resource
        $ch = curl_init();
        // set url
        curl_setopt($ch, CURLOPT_URL, 'http://localhost:9424/rockfish?env=cms&site=de' );
        //return the transfer as a string
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        // $output contains the output string
        $output = curl_exec($ch);

        // close curl resource to free up system resources
        curl_close($ch);

    }

    private function __construct()
    {

        add_action( 'publish_post', array( $this, 'rockfish__hook' ), 10, 2 );

    }


}

add_action( 'plugins_loaded', array( 'Rockfish', 'get_instance' ) );

?>