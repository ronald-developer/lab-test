import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { CreateLeavesTestsComponent } from './create/create-leaves-tests.component';
import { LeavesComponent } from './leaves.component';
import { LeavesNavigationPath } from './navigation/leaves-navigation-path';
import { LeavesReportDetailsComponent } from './reports/details/leaves-report-details.component';
import { LeavesReportSummaryComponent } from './reports/summary/leaves-report-summary.component';

const parent = LeavesNavigationPath.parent;
const children = LeavesNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: LeavesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateLeavesTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: LeavesReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: LeavesReportDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}`,
        redirectTo: `${children.reports}/${children.reportsSummary}`
    },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule { }
