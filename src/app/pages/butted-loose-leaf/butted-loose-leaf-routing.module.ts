import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { CreateButtedLooseLeafTestsComponent } from './create/create-butted-loose-leaf-tests.component';
import { ButtedLooseLeafComponent } from './butted-loose-leaf.component';
import { ButtedLooseLeafNavigationPath } from './navigation/butted-loose-leaf-navigation-path';
import { ButtedLooseLeafReportDetailsComponent } from './reports/details/butted-loose-leaf-report-details.component';
import { ButtedLooseLeafReportSummaryComponent } from './reports/summary/butted-loose-leaf-report-summary.component';

const parent = ButtedLooseLeafNavigationPath.parent;
const children = ButtedLooseLeafNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: ButtedLooseLeafComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateButtedLooseLeafTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: ButtedLooseLeafReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: ButtedLooseLeafReportDetailsComponent,
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
export class ButtedLooseLeafRoutingModule { }
