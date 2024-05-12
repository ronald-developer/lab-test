import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsNavigationPath } from './reports-navigation-path';
import { testLastResultRoutes } from './tests-last-result/test-last-result-routing';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: ReportsNavigationPath.children.lastTestsResult,
	},
	{
		path: ReportsNavigationPath.children.lastTestsResult,
		children: testLastResultRoutes
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportsRoutingModule { }
