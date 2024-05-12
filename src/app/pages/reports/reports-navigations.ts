import { SidebarNavMenu } from '../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { ReportsNavigationPath } from './reports-navigation-path';
import { TestLastFifteenDetailsResultNavigations } from './tests-last-result/test-last-fifteen-details-result/navigation/test-last-fifteen-details-result-navigations';
import { TestLastThreeResultNavigations } from './tests-last-result/test-last-three-result/navigation/test-last-three-result-navigations';
const parent = ReportsNavigationPath.parent;


export class ReportsNavigations {
	public static get routes() {
		const nav: SidebarNavMenu = {
			route: parent,
			title: 'Tests results',
			order: 1,
			isParent: true,
			allowedRoles: ['Admin'],
			icon: 'fa fa-solid fa-file-lines',
			children: [
				TestLastThreeResultNavigations.routes,
				TestLastFifteenDetailsResultNavigations.routes,
			]
		};
		return nav;
	}
}
