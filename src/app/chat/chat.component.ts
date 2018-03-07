import {Component, OnInit} from "@angular/core";
import {Message} from "../shared/classes/message";
import {PubnubService} from "../shared/services/pubnub.service";

@Component({
	selector: "chat",
	template: require("./chat.component.html")
})
export class ChatComponent implements OnInit {
	chatMessages: Message[] = [];

	constructor(protected pubnubService: PubnubService) {}

	ngOnInit(): void {
		this.pubnubService.chatObserver
			.subscribe(chatMessages => this.chatMessages = chatMessages);
	}

	getChatRoom(): string {
		return(this.pubnubService.getChatRoom());
	}

	sendChat(message: string, username: string) {
		this.pubnubService.sendChat(message, username);
	}
}