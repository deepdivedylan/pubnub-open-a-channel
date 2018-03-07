import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from "../shared/classes/message";
import {PubnubService} from "../shared/services/pubnub.service";

@Component({
	selector: "chat",
	template: require("./chat.component.html")
})
export class ChatComponent implements OnInit {
	chatForm: FormGroup;
	chatMessages: Message[] = [];

	constructor(protected formBuilder: FormBuilder, protected pubnubService: PubnubService) {
		this.chatForm = this.formBuilder.group({
			chatMessage: ["", [Validators.maxLength(1024), Validators.required]]
		});
	}

	ngOnInit(): void {
		this.pubnubService.chatObserver
			.subscribe(chatMessages => this.chatMessages = chatMessages);
	}

	getChatRoom(): string {
		return(this.pubnubService.getChatRoom());
	}

	sendChat() {
		this.pubnubService.sendChat(this.chatForm.value.chatMessage);
	}
}