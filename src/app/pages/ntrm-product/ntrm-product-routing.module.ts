import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { NtrmProductNavigationPath } from './navigation/ntrm-product-navigation-path';
import { NtrmProductComponent } from './ntrm-product.component';
import { NtrmProductReportDetailsComponent } from './reports/details/ntrm-product-report-details.component';
import { NtrmProductReportSummaryComponent } from './reports/summary/ntrm-product-report-summary.component';
import { EditNtrmProductTestsComponent } from './edit/edit-ntrm-product-tests.component';
import { CreateNtrmProductTestsComponent } from './create/create-ntrm-product-test-component';

const parent = NtrmProductNavigationPath.parent;
const children = NtrmProductNavigationPath.children;
const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'list'
	},
	{
		path: children.list,
		data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
		component: NtrmProductComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.create,
		data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
		component: CreateNtrmProductTestsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.edit,
		data: { roles: NavConfig.getRoles(`${parent}/${children.edit}`) },
		component: EditNtrmProductTestsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsSummary}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
		component: NtrmProductReportSummaryComponent,
		canActivate: [AuthGuard]
	},
	{
		path: `${children.reports}/${children.reportsDetails}`,
		data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
		component: NtrmProductReportDetailsComponent,
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
export class NtrmProductRoutingModule { }
