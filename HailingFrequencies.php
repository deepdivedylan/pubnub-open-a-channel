<?php
require_once("vendor/autoload.php");

use PubNub\PubNub;
use PubNub\Callbacks\SubscribeCallback;
use PubNub\Enums\PNStatusCategory;
use PubNub\Exceptions\PubNubUnsubscribeException;

class HailingFrequencies extends SubscribeCallback {
	/**
	 * PubNub configuration object
	 * @var PubNub $pubNub
	 **/
	protected $pubNub;

	public function __construct(PubNub $newPubNub) {
		$this->pubNub = $newPubNub;
	}

	public function message($pubnub, $message) : void {
		// method unnecessary
	}

	public function presence($pubnub, $presence) : void {
		// method unnecessary
	}

	public function status($pubnub, $status) : void {
		if($status->getCategory() === PNStatusCategory::PNConnectedCategory) {
			echo "connection established" . PHP_EOL;
			$result = $this->pubNub->publish()->channel("romulan-senate")->message("feel the fuzzy")->sync();
			var_dump($result);
			throw(new PubNubUnsubscribeException("unsubscribing after publishing"));
		}
	}
}