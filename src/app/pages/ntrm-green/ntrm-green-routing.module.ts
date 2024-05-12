import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { CreateNtrmGreenTestsComponent } from './create/create-ntrm-green-tests.component';
import { NtrmGreenNavigationPath } from './navigation/ntrm-green-navigation-path';
import { NtrmGreenComponent } from './ntrm-green.component';
import { NtrmGreenReportDetailsComponent } from './reports/details/ntrm-green-report-details.component';
import { NtrmGreenReportSummaryComponent } from './reports/summary/ntrm-green-report-summary.component';


const parent = NtrmGreenNavigationPath.parent;
const children = NtrmGreenNavigationPath.children;
const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'list'
	},
	{
		path: children.list,
		data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
		component: NtrmGreenComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.create,
		data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
		component: CreateNtrmGreenTestsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsSummary}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
		component: NtrmGreenReportSummaryComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsDetails}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
		component: NtrmGreenReportDetailsComponent,
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
export class NtrmGreenRoutingModule { }
