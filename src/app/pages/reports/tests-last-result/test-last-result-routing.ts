import { Routes } from '@angular/router';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { TestLastThreeResultListComponent } from './test-last-three-result/list/test-last-three-result-list.component';
import { TestLastThreeResultNavigationPath } from './test-last-three-result/navigation/test-last-three-result-navigation-path';
import { TestLastFifteenDetailsResultNavigationPath } from './test-last-fifteen-details-result/navigation/test-last-fifteen-details-result-navigation-path';
import { DegsDryLastFifteenDetailsListComponent } from './test-last-fifteen-details-result/degs-dry/degs-dry-last-fifteen-details-list.component';

export const testLastResultRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: TestLastThreeResultNavigationPath.children.lastThree
	},
	{
		path: TestLastThreeResultNavigationPath.children.lastThree,
		data: { roles: NavConfig.getReportsRoles(`${TestLastThreeResultNavigationPath.parent}/${TestLastThreeResultNavigationPath.children.lastThree}`) },
		component: TestLastThreeResultListComponent,
		canActivate: [AuthGuard]
	},
	{
		path: TestLastFifteenDetailsResultNavigationPath.children.degs,
		data: { roles: NavConfig.getReportsRoles(`${TestLastFifteenDetailsResultNavigationPath.parent}/${TestLastFifteenDetailsResultNavigationPath.children.degs}`) },
		component: DegsDryLastFifteenDetailsListComponent,
		canActivate: [AuthGuard]
	}
];
