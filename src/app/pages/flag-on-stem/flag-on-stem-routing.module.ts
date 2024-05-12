import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from '../../modules/auth/services/auth.guard.service';
import { CreateFlagOnStemTestsComponent } from './create/create-flag-on-stem-tests.component';
import { FlagOnStemComponent } from './flag-on-stem.component';
import { FlagOnStemNavigationPath } from './navigation/flag-on-stem-navigation-path';
import { FlagOnStemReportDetailsComponent } from './reports/details/flag-on-stem-report-details.component';
import { FlagOnStemReportSummaryComponent } from './reports/summary/flag-on-stem-report-summary.component';

const parent = FlagOnStemNavigationPath.parent;
const children = FlagOnStemNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: FlagOnStemComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateFlagOnStemTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: FlagOnStemReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: FlagOnStemReportDetailsComponent,
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
export class FlagOnStemRoutingModule { }
