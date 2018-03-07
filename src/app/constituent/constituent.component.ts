import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../shared/classes/status";
import {PubnubService} from "../shared/services/pubnub.service";

@Component({
	template: require("./constituent.component.html")
})

export class ConstituentComponent {
	roomForm: FormGroup;
	status: Status = null;

	constructor(protected formBuilder: FormBuilder, protected pubnubService: PubnubService) {
		this.roomForm = this.formBuilder.group({
			roomName: ["", [Validators.maxLength(64), Validators.pattern(/^[\da-z-]+$/), Validators.required]],
			username: ["", [Validators.maxLength(64), Validators.pattern(/^[\da-z-]+$/), Validators.required]]
		});
	}

	joinRoom(): void {
		this.pubnubService.joinChatRoom(this.roomForm.value.roomName, this.roomForm.value.username);
	}
}