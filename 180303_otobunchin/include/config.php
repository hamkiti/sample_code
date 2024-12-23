<?php
date_default_timezone_set('Asia/Tokyo');
ini_set('display_errors', 0);
error_reporting(E_ALL ^ E_NOTICE);//エラーログにNOTICEは含めない

define('SITE_STAGE', 'dev');
define('DEBUG_JS_LOG', 1);// 0:OFF / 1:ON

define('DIR_INCLUDE', dirname(__FILE__));
define('DIR_CLASSES', DIR_INCLUDE.'/classes');
define('DIR_TEMPLATE', DIR_INCLUDE.'/template');

define('DIR_ROOT', dirname(dirname(__FILE__)));
