import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Status} from "../classes/status";

@Injectable()
export class SenatorService {

	constructor(protected http: HttpClient) {}

	private userUrl = "api/senator/";

	createRoom() : Observable<Status> {
		return(this.http.post<Status>(this.userUrl, {command: "open"}));
	}

	destroyRoom(roomId: string): Observable<Status> {
		return(this.http.delete<Status>(this.userUrl + roomId));
	}
}