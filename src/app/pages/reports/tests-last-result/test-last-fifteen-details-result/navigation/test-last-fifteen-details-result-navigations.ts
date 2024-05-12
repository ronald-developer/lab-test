import { SidebarNavMenu } from "src/app/core/components/sidebar-menu-nav/models/sidebar-menu-nav-type";
import { TestLastFifteenDetailsResultNavigationPath } from "./test-last-fifteen-details-result-navigation-path";

const parent = TestLastFifteenDetailsResultNavigationPath.parent;
const children = TestLastFifteenDetailsResultNavigationPath.children;

/**
 * Test last result - navigation route configuration
 * used to render tips test last result sidebar navigation menu
 */
export class TestLastFifteenDetailsResultNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Last 15 detailed results',
            order: 1,
			isParent:true,
            allowedRoles: ['Admin'],
			children:[
				{
                    route: `${parent}/${children.degs}`,
                    title: 'Degs dry',
                    order: 1,
                    allowedRoles: ['Admin']
                },
			]
        };

        return nav;
    }
}
