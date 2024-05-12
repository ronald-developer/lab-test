import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from '../../modules/auth/services/auth.guard.service';
import { StemAuditNavigationPath } from './navigation/stem-audit-navigation-path';
import { CreateStemAuditTestsComponent } from './create/create-stem-audit-tests.component';
import { StemAuditReportDetailsComponent } from './reports/details/stem-audit-report-details.component';
import { StemAuditReportSummaryComponent } from './reports/summary/stem-audit-report-summary.component';
import { StemAuditComponent } from './stem-audit.component';

const parent = StemAuditNavigationPath.parent;
const children = StemAuditNavigationPath.children;

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'list'
  },
  {
      path: children.list,
      data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
      component: StemAuditComponent,
      canActivate: [AuthGuard]
  },
  {
      path: children.create,
      data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
      component: CreateStemAuditTestsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: `${children.reports}/${children.reportsSummary}`,
      data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
      component: StemAuditReportSummaryComponent,
      canActivate: [AuthGuard]
  },
  {
      path: `${children.reports}/${children.reportsDetails}`,
      data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
      component: StemAuditReportDetailsComponent,
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
export class StemAuditRoutingModule { }
