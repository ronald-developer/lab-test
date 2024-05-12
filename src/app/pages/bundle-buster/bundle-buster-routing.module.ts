
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from '../../modules/auth/services/auth.guard.service';
import { CreateBundleBusterTestsComponent } from './create/create-bundle-buster-tests.component';
import { BundleBusterNavigationPath } from './navigation/bundle-buster-navigation-path';
import { BundleBusterReportDetailsComponent } from './reports/details/bundle-buster-report-details.component';
import { BundleBusterReportSummaryComponent } from './reports/summary/bundle-buster-report-summary.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BundleBusterListComponent } from './list/bundle-buster-list.component';

const parent = BundleBusterNavigationPath.parent;
const children = BundleBusterNavigationPath.children;
const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'list'
	},
	{
		path: children.list,
		data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
		component: BundleBusterListComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.create,
		data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
		component: CreateBundleBusterTestsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsSummary}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
		component: BundleBusterReportSummaryComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsDetails}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
		component: BundleBusterReportDetailsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}`,
		redirectTo: `${children.reports}/${children.reportsSummary}`
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BundleBusterRoutingModule { }
