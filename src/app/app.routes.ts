import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {PubNubAngular} from "pubnub-angular2";
import {ChatComponent} from "./chat/chat.component";
import {SplashComponent} from "./splash/splash.component";
import {ConstituentComponent} from "./constituent/constituent.component";
import {SenatorComponent} from "./senator/senator.component";
import {ConstituentService} from "./shared/services/constituent.service";
import {SenatorService} from "./shared/services/senator.service";
import {SessionService} from "./shared/services/session.service";
import {DeepDiveInterceptor} from "./shared/interceptors/deep.dive.interceptor";
import {PubnubService} from "./shared/services/pubnub.service";


export const allAppComponents = [ChatComponent, ConstituentComponent, SenatorComponent, SplashComponent];

export const routes: Routes = [
	{path: "constituent", component: ConstituentComponent},
	{path: "senator", component: SenatorComponent},
	{path: "", component: SplashComponent}
];

export const appRoutingProviders: any[] = [
	{provide: HTTP_INTERCEPTORS, useClass: DeepDiveInterceptor, multi: true},
	PubNubAngular,
	ConstituentService,
	PubnubService,
	SenatorService,
	SessionService
];

export const routing = RouterModule.forRoot(routes);