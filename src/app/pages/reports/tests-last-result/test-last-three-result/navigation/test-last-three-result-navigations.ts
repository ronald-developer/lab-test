import { SidebarNavMenu } from "src/app/core/components/sidebar-menu-nav/models/sidebar-menu-nav-type";
import { TestLastThreeResultNavigationPath } from "./test-last-three-result-navigation-path";

const parent = TestLastThreeResultNavigationPath.parent;
const children = TestLastThreeResultNavigationPath.children;

/**
 * Test last result - navigation route configuration
 * used to render test last 3 result sidebar navigation menu
 */
export class TestLastThreeResultNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: `${parent}/${children.lastThree}`,
            title: 'Last 3 results',
            order: 1,
            allowedRoles: ['Admin'],
            icon: 'fa-solid fa-square-poll-vertical',
        };

        return nav;
    }
}
