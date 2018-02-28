import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {SplashComponent} from "./splash/splash.component";
import {ConstituentComponent} from "./constituent/constituent.component";
import {SenatorComponent} from "./senator/senator.component";
import {ConstituentService} from "./shared/services/constituent.service";
import {SenatorService} from "./shared/services/senator.service";
import {DeepDiveInterceptor} from "./shared/interceptors/deep.dive.interceptor";


export const allAppComponents = [ConstituentComponent, SenatorComponent, SplashComponent];

export const routes: Routes = [
	{path: "constituent", component: ConstituentComponent},
	{path: "senator", component: SenatorComponent},
	{path: "", component: SplashComponent}
];

export const appRoutingProviders: any[] = [
	{provide: HTTP_INTERCEPTORS, useClass: DeepDiveInterceptor, multi: true},
	ConstituentService,
	SenatorService
];

export const routing = RouterModule.forRoot(routes);