import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from './../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from './../../modules/auth/services/auth.guard.service';
import { CreateStemLengthTestsComponent } from './create/create-stem-length-tests.component';
import { StemLengthNavigationPath } from './navigation/stem-length-navigation-path';
import { StemLengthReportDetailsComponent } from './reports/details/stem-length-report-details.component';
import { StemLengthReportSummaryComponent } from './reports/summary/stem-length-report-summary.component';
import { StemLengthComponent } from './stem-length.component';
const parent = StemLengthNavigationPath.parent;
const children = StemLengthNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: StemLengthNavigationPath.children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: StemLengthComponent,
        canActivate: [AuthGuard]
    },
    {
        path: StemLengthNavigationPath.children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateStemLengthTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: StemLengthReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: StemLengthReportDetailsComponent,
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
export class StemLengthRoutingModule { }
