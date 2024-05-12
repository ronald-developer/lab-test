import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DegsNavigationPath } from './navigation/degs-navigation-path';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';
import { DegsComponent } from './degs.component';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { CreateDegsTestsComponent } from './create/create-degs-tests.component';
import { DegsReportSummaryComponent } from './reports/summary/degs-report-summary.component';
import { DegsReportDetailsComponent } from './reports/details/degs-report-details.component';
const parent = DegsNavigationPath.parent;
const children = DegsNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: DegsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateDegsTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: DegsReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: DegsReportDetailsComponent,
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
export class DegsRoutingModule { }
