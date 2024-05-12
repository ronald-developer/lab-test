import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavConfig } from '../../core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from '../../modules/auth/services/auth.guard.service';
import { CreateDensityTestsComponent } from './create/create-density-tests.component';
import { DensityComponent } from './density.component';
import { DensityNavigationPath } from './navigation/density-navigation-path';
import { DensityReportDetailsComponent } from './reports/details/density-report-details.component';
import { DensityReportSummaryComponent } from './reports/summary/density-report-summary.component';

const parent = DensityNavigationPath.parent;
const children = DensityNavigationPath.children;

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'list'
  },
  {
      path: children.list,
      data: { roles: NavConfig.getRoles(`${parent}/${children.list}`) },
      component: DensityComponent,
      canActivate: [AuthGuard]
  },
  {
      path: children.create,
      data: { roles: NavConfig.getRoles(`${parent}/${children.create}`) },
      component: CreateDensityTestsComponent,
      canActivate: [AuthGuard]
  },
  {
      path: `${children.reports}/${children.reportsSummary}`,
      data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsSummary}`) },
      component: DensityReportSummaryComponent,
      canActivate: [AuthGuard]
  },
  {
      path: `${children.reports}/${children.reportsDetails}`,
      data: { roles: NavConfig.getRoles(`${parent}/${children.reports}/${children.reportsDetails}`) },
      component: DensityReportDetailsComponent,
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
export class DensityRoutingModule { }
