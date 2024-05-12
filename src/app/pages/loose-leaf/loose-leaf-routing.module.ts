import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { CreateLooseLeafTestsComponent } from './create/create-loose-leaf-tests.component';
import { LooseLeafComponent } from './loose-leaf.component';
import { LooseLeafNavigationPath } from './navigation/loose-leaf-navigation-path';
import { LooseLeafReportDetailsComponent } from './reports/details/loose-leaf-report-details.component';
import { LooseLeafReportSummaryComponent } from './reports/summary/loose-leaf-report-summary.component';

const parent = LooseLeafNavigationPath.parent;
const children = LooseLeafNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: LooseLeafComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateLooseLeafTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: LooseLeafReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: LooseLeafReportDetailsComponent,
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
export class LooseLeafRoutingModule { }
