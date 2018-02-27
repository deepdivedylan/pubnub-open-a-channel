<?php
require_once("HailingFrequencies.php");
require_once("vendor/autoload.php");
require_once("/etc/apache2/capstone-mysql/encrypted-config.php");

use PubNub\{PNConfiguration, PubNub};

//prepare an empty reply
$reply = new stdClass();
$reply->status = 200;
$reply->data = null;

try {
	$config = readConfig("/etc/apache2/capstone-mysql/kmaru.ini");
	$pubNub = json_decode($config["pubnub"]);
	$pubNubConf = new PNConfiguration();
	$pubNubBoard = new PubNub($pubNubConf);
	$pubNubConf->setSubscribeKey($pubNub->subscribeKey);
	$pubNubConf->setPublishKey($pubNub->publishKey);
	$pubNubConf->setSecretKey($pubNub->secretKey);
	$pubNubConf->setSecure(true);


	$pubNubBoard->addListener(new HailingFrequencies($pubNubBoard));

	$pubNubBoard->subscribe()->channels("romulan-senate")->execute();
} catch(\Exception | \TypeError $exception) {
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
	$reply->trace = $exception->getTrace();
}

// encode and return reply to front end caller
header("Content-type: application/json");
echo json_encode($reply);