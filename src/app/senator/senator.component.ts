import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Status} from "../shared/classes/status";
import {PubnubService} from "../shared/services/pubnub.service";

@Component({
	template: require("./senator.component.html")
})

export class SenatorComponent {
	roomForm: FormGroup;
	status: Status = null;

	constructor(protected formBuilder: FormBuilder, protected pubnubService: PubnubService) {
		this.roomForm = this.formBuilder.group({
			roomName: ["", [Validators.maxLength(64), Validators.pattern(/^[\da-z-]+$/), Validators.required]]
		});
	}

	createRoom(): void {
		this.pubnubService.createRoom(this.roomForm.value.roomName);
	}
}