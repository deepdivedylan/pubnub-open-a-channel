<?php
require_once(dirname(__DIR__, 3) . "/vendor/autoload.php");
require_once(dirname(__DIR__, 3) . "/php/lib/xsrf.php");
require_once("/etc/apache2/capstone-mysql/encrypted-config.php");

use PubNub\{PNConfiguration, PubNub};
use PubNub\Callbacks\SubscribeCallback;
use PubNub\Enums\PNStatusCategory;
use PubNub\Exceptions\PubNubUnsubscribeException;

class SenatorCallback extends SubscribeCallback {
	/**
	 * PubNub configuration object
	 * @var PubNub $pubNub
	 **/
	protected $pubNub;
	/**
	 * room name to create
	 * @var string $roomName
	 **/
	protected $roomName;

	public function __construct(PubNub $newPubNub, string $roomName) {
		$this->pubNub = $newPubNub;
		$this->roomName = $roomName;
	}

	public function message($pubnub, $message) : void {
		// method unnecessary
	}

	public function presence($pubnub, $presence) : void {
		// method unnecessary
	}

	public function status($pubnub, $status) : void {
		if($status->getCategory() === PNStatusCategory::PNConnectedCategory) {
			$now = new \DateTime();
			$timestamp = round((int)$now->format("U.u") * 1000);
			$message = (object)["message" => "feel the fuzzy", "timestamp" => $timestamp, "username" => "senator-arlo"];
			$this->pubNub->publish()->channel($this->roomName)->message($message)->sync();
			throw(new PubNubUnsubscribeException("unsubscribing after publishing"));
		}
	}
}

// open session
if(session_status() !== PHP_SESSION_ACTIVE) {
	session_start();
}

// prepare an empty reply
$reply = new stdClass();
$reply->status = 200;
$reply->data = null;

try {
	// determine which HTTP method was used
	$method = array_key_exists("HTTP_X_HTTP_METHOD", $_SERVER) ? $_SERVER["HTTP_X_HTTP_METHOD"] : $_SERVER["REQUEST_METHOD"];

	if($method === "POST") {
		verifyXsrf();
		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);
		$roomName = filter_var($requestObject->roomName, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

		$config = readConfig("/etc/apache2/capstone-mysql/pubnub-open-a-channel.ini");
		$pubNub = json_decode($config["pubnub"]);
		$pubNubConf = new PNConfiguration();
		$pubNubBoard = new PubNub($pubNubConf);
		$pubNubConf->setSubscribeKey($pubNub->subscribeKey);
		$pubNubConf->setPublishKey($pubNub->publishKey);
		$pubNubConf->setSecretKey($pubNub->secretKey);
		$pubNubConf->setSecure(true);


		$pubNubBoard->addListener(new SenatorCallback($pubNubBoard, $roomName));

		$pubNubBoard->subscribe()->channels($roomName)->execute();
		$reply->message = "room created OK";
	}
} catch(Exception $exception) {
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
}

header("Content-type: application/json");
echo json_encode($reply);