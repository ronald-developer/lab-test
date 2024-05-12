import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from '../../modules/auth/services/auth.guard.service';
import { CreateShortStemTestsComponent } from './create/create-short-stem-tests.component';
import { ShortStemNavigationPath } from './navigation/short-stem-navigation-path';
import { ShortStemReportDetailsComponent } from './reports/details/short-stem-report-details.component';
import { ShortStemReportSummaryComponent } from './reports/summary/short-stem-report-summary.component';
import { ShortStemComponent } from './short-stem.component';

const parent = ShortStemNavigationPath.parent;
const children = ShortStemNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: ShortStemComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateShortStemTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: ShortStemReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: ShortStemReportDetailsComponent,
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
export class ShortStemRoutingModule { }
