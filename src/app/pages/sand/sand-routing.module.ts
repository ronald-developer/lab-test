import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { CreateSandTestsComponent } from './create/create-sand-tests.component';
import { SandNavigationPath } from './navigation/sand-navigation-path';
import { SandReportDetailsComponent } from './reports/details/sand-report-details.component';
import { SandReportSummaryComponent } from './reports/summary/sand-report-summary.component';
import { SandComponent } from './sand.component';

const parent = SandNavigationPath.parent;
const children = SandNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: SandComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateSandTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: SandReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: SandReportDetailsComponent,
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
export class SandRoutingModule { }
