<?php
require_once("vendor/autoload.php");

use PubNub\{PNConfiguration, PubNub};
use PubNub\Callbacks\SubscribeCallback;
use PubNub\Enums\PNStatusCategory;

class HailingFrequencies extends SubscribeCallback {
	function message($pubnub, $message) : void {
		echo "Ken never stays on message!" . PHP_EOL;
		var_dump($message);
	}

	function presence($pubnub, $presence) : void {
		// TODO: Implement presence() method.
	}

	function status($pubnub, $status) : void {
		if($status->getCategory() === PNStatusCategory::PNDisconnectedCategory) {
			echo "Sprint user detected" . PHP_EOL;
		}
	}
}