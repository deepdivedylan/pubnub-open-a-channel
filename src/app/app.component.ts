import {Component} from "@angular/core";
import {SessionService} from "./shared/services/session.service";
import {Status} from "./shared/classes/status";

@Component({
	selector: "pubnub-open-a-channel",
	template: require("./app.component.html")
})

export class AppComponent {

	status: Status = null;

	constructor(protected sessionService: SessionService) {
		this.sessionService.setSession()
			.subscribe(status => this.status = status);
	}
}