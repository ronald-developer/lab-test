import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoistureAndTempNavigationPath } from './navigation/moisture-and-temp-navigation-path';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { EditMoistureAndTempTestsComponent } from './edit/edit-moisture-and-temp-tests.component';
import { MoistureAndTempComponent } from './moisture-and-temp.component';
import { MoistureAndTempReportDetailsComponent } from './reports/details/moisture-and-temp-report-details.component';
import { MoistureAndTempReportSummaryComponent } from './reports/summary/moisture-and-temp-report-summary.component';
import { MoistureAndTempTestUploadComponent } from './upload/moisture-and-temp-test-upload.component';
import { CreateMoistureAndTempTestsComponent } from './create/create-moisture-and-temp-tests.component';

const parent = MoistureAndTempNavigationPath.parent;
const children = MoistureAndTempNavigationPath.children;
const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'list'
	},
	{
		path: children.list,
		data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
		component: MoistureAndTempComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.create,
		data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
		component: CreateMoistureAndTempTestsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.edit,
		data: { roles: NavConfig.getRoles(`${parent}/${children.edit}`) },
		component: EditMoistureAndTempTestsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.upload,
		data: { roles: NavConfig.getRoles(`${parent}/${children.upload}`) },
		component: MoistureAndTempTestUploadComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsSummary}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
		component: MoistureAndTempReportSummaryComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsDetails}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
		component: MoistureAndTempReportDetailsComponent,
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
export class MoistureAndTempRoutingModule { }
