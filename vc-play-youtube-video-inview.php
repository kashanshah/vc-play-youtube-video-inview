<?php
/**
 *  Plugin Name: VC Play Youtube Video Inview
	Plugin URI: https://www.kashanshah.com
	Author: Kashan Shah
	Author URI: https://www.kashanshah.com
	Version: 0.0.1
	Description: VC Play Youtube Video Inview - autoplays the youtube video when the video is in view
	License: GPL version 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 *  @package Convert_Plus.
 */
function vcpyvi_replace_text($text) {
	$pattern = '/data-src="https:\/\/www.youtube.com\/embed\/(\S+)\?/';
	$replacement = 'data-src="https://www.youtube.com/embed/$1?enablejsapi=1&amp;';
	$text = preg_replace($pattern, $replacement, $text);
	return $text;
}
add_filter('the_content', 'vcpyvi_replace_text', 99999999999);


function vcpyvi_enqueue_script() {
    wp_enqueue_script( 'vcpyvi-inview-script', plugin_dir_url( __FILE__ ) . 'node_modules/jquery-inview/jquery.inview.min.js', array('jquery'));
    wp_enqueue_script( 'vcpyvi-main-script', plugin_dir_url( __FILE__ ) . 'js/main.js', array('jquery'));
}
add_action('wp_enqueue_scripts', 'vcpyvi_enqueue_script');