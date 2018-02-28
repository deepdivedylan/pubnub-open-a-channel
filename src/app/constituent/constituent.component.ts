import {Component, OnInit} from "@angular/core";
import {PubNubAngular} from "pubnub-angular2";

@Component({
	template: require("./constituent.component.html")
})

export class ConstituentComponent {

	constructor(protected pubnub: PubNubAngular) {
		this.pubnub.init({
			publishKey: "pub-c-d8eb3d22-aab2-4526-a633-a6da83bb3ef7",
			subscribeKey: "sub-c-73e431b8-1cb2-11e8-b6fb-56b8b46ff3aa"
		});
	}
}