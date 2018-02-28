import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Status} from "../classes/status";

@Injectable()
export class SenatorService {

	constructor(protected http: HttpClient) {}

	private senatorUrl = "api/senator/";

	createRoom(roomName: string) : Observable<Status> {
		return(this.http.post<Status>(this.senatorUrl, {command: "open", roomName: roomName}));
	}

	destroyRoom(roomName: string): Observable<Status> {
		return(this.http.post<Status>(this.senatorUrl, {command: "delete", roomName: roomName}));
	}
}