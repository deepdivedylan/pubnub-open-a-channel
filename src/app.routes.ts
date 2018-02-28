import {RouterModule, Routes} from "@angular/router";
import {SplashComponent} from "./splash/splash.component";
import {ConstituentComponent} from "./constituent/consituent.component";
import {SenatorComponent} from "./senator/senator.component";
import {ConstituentService} from "./shared/services/constituent.service";
import {SenatorService} from "./shared/services/senator.service";


export const allAppComponents = [ConstituentComponent, SenatorComponent, SplashComponent];

export const routes: Routes = [
	{path: "constituent", component: ConstituentComponent},
	{path: "senator", component: SenatorComponent},
	{path: "", component: SplashComponent}
];

export const appRoutingProviders: any[] = [
	ConstituentService,
	SenatorService
];

export const routing = RouterModule.forRoot(routes);