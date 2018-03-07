import {Injectable} from "@angular/core";
import {PubNubAngular} from "pubnub-angular2";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Message} from "../classes/message";
import {SenatorService} from "./senator.service";

@Injectable()
export class PubnubService {

	protected chatSubject : BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
	public chatObserver : Observable<Message[]> = this.chatSubject.asObservable();
	protected chatRoom : string = null;

	constructor(protected pubnub: PubNubAngular, protected senatorService: SenatorService) {
		this.pubnub.init({
			publishKey: "pub-c-d8eb3d22-aab2-4526-a633-a6da83bb3ef7",
			subscribeKey: "sub-c-73e431b8-1cb2-11e8-b6fb-56b8b46ff3aa"
		});

		let parent = this;
		this.pubnub.addListener({
			message: function(pubnubMessage: any) : void {
				let message = pubnubMessage.message;
				let chatMessages = parent.chatSubject.getValue();
				chatMessages.push(message);
				parent.chatSubject.next(chatMessages);
			}
		});
	}

	getChatRoom() : string {
		return(this.chatRoom);
	}

	setChatRoom(roomName: string) : void {
		this.chatRoom = roomName;
		this.pubnub.subscribe({channels: [roomName]});
	}

	createRoom(roomName: string) : void {
		this.senatorService.createRoom(roomName)
			.subscribe(() => this.setChatRoom(roomName));
	}

	sendChat(messageText: string, username: string): void {
		let message = new Message(messageText, new Date(), username);
		this.pubnub.publish({message: message, channel: this.chatRoom});
	}
}