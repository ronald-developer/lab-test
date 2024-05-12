import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { CreateNtrmInLineTestsComponent } from './create/create-ntrm-in-line-test.component';
import { EditNtrmInLineTestsComponent } from './edit/edit-ntrm-in-line-tests.component';
import { NtrmInLineNavigationPath } from './navigation/ntrm-in-line-navigation-path';
import { NtrmInLineComponent } from './ntrm-in-line.component';
import { NtrmInLineReportDetailsComponent } from './reports/details/ntrm-in-line-report-details.component';
import { NtrmInLineReportSummaryComponent } from './reports/summary/ntrm-in-line-report-summary.component';

const parent = NtrmInLineNavigationPath.parent;
const children = NtrmInLineNavigationPath.children;
const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'list'
	},
	{
		path: children.list,
		data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
		component: NtrmInLineComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.create,
		data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
		component: CreateNtrmInLineTestsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.edit,
		data: { roles: NavConfig.getRoles(`${parent}/${children.edit}`) },
		component: EditNtrmInLineTestsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsSummary}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
		component: NtrmInLineReportSummaryComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsDetails}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
		component: NtrmInLineReportDetailsComponent,
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
export class NtrmInLineRoutingModule { }
