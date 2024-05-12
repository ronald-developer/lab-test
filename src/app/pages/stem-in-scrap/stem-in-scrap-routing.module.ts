import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from '../../modules/auth/services/auth.guard.service';
import { CreateStemInScrapTestsComponent } from './create/create-stem-in-scrap-tests.component';
import { StemInScrapNavigationPath } from './navigation/stem-in-scrap-navigation-path';
import { StemInScrapReportDetailsComponent } from './reports/details/stem-in-scrap-report-details.component';
import { StemInScrapReportSummaryComponent } from './reports/summary/stem-in-scrap-report-summary.component';
import { StemInScrapComponent } from './stem-in-scrap.component';

const parent = StemInScrapNavigationPath.parent;
const children = StemInScrapNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: StemInScrapComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateStemInScrapTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: StemInScrapReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: StemInScrapReportDetailsComponent,
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
export class StemInScrapRoutingModule { }
