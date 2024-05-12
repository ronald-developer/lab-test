
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from '../../modules/auth/services/auth.guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateShakerEfficiencyTestsComponent } from './create/create-shaker-efficiency-tests.component';
import { ShakerEfficiencyNavigationPath } from './navigation/shaker-efficiency-navigation-path';
import { ShakerEfficiencyReportDetailsComponent } from './reports/details/shaker-efficiency-report-details.component';
import { ShakerEfficiencyComponent } from './shaker-efficiency.component';
import { ShakerEfficiencyReportSummaryComponent } from './reports/summary/shaker-efficiency-report-summary.component';

const parent = ShakerEfficiencyNavigationPath.parent;
const children = ShakerEfficiencyNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: ShakerEfficiencyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateShakerEfficiencyTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: ShakerEfficiencyReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: ShakerEfficiencyReportDetailsComponent,
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
export class ShakerEfficiencyRoutingModule { }
