
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from '../../modules/auth/services/auth.guard.service';
import { CreateInlineHsTestsComponent } from './create/create-inline-hs-tests.component';
import { InlineHsComponent } from './inline-hs.component';
import { InlineHsNavigationPath } from './navigation/inline-hs-navigation-path';
import { InlineHsReportDetailsComponent } from './reports/details/inline-hs-report-details.component';
import { InlineHsReportSummaryComponent } from './reports/summary/inline-hs-report-summary.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const parent = InlineHsNavigationPath.parent;
const children = InlineHsNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: InlineHsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateInlineHsTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: InlineHsReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: InlineHsReportDetailsComponent,
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
export class InlineHsRoutingModule { }
