
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from '../../modules/auth/services/auth.guard.service';
import { CreateInlineDataTestsComponent } from './create/create-inline-data-tests.component';
import { InlineDataComponent } from './inline-data.component';
import { InlineDataNavigationPath } from './navigation/inline-data-navigation-path';
import { InlineDataReportDetailsComponent } from './reports/details/inline-data-report-details.component';
import { InlineDataReportSummaryComponent } from './reports/summary/inline-data-report-summary.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const parent = InlineDataNavigationPath.parent;
const children = InlineDataNavigationPath.children;
const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: children.list,
        data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
        component: InlineDataComponent,
        canActivate: [AuthGuard]
    },
    {
        path: children.create,
        data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
        component: CreateInlineDataTestsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsSummary}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
        component: InlineDataReportSummaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: `${children.reports}/${children.reportsDetails}`,
        data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
        component: InlineDataReportDetailsComponent,
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
export class InlineDataRoutingModule { }
