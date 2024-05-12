import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { locationRoutes } from './location/location-routing';
import { shakerRoutes } from './shaker/shaker-routing';
const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'location'
	},
	{
		path: 'location',
		children: locationRoutes
	},
	{
		path: 'shaker',
		children: shakerRoutes
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SetupRoutingModule { }
