import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Status} from "../classes/status";

@Injectable()
export class ConstituentService {

	constructor(protected http: HttpClient) {}

	private constituentUrl = "api/constituent/";

	joinRoom(roomId: string, username: string) : Observable<Status> {
		return(this.http.post<Status>(this.constituentUrl, {room: roomId, username: username}));
	}
}