import { SidebarNavMenu } from '../models/sidebar-menu-nav-type';
import { labTestsNavigationMenus, reportsNavigationMenus, setupNavigationMenus } from './sidebar-menu-navigation-lists';


/**
 * key value pair store, where in: key is the route and value is the sidebarnavmenu object
 */
export const sidebarNavigationStore = new Map<string, SidebarNavMenu>(flatten(labTestsNavigationMenus).map(nav => [nav.route, nav]));

/**
 * key value pair store, where in: key is the route and value is the sidebarnavmenu object
 */
export const sidebarSetupNavigationStore = new Map<string, SidebarNavMenu>(flatten(setupNavigationMenus).map(nav => [nav.route, nav]));

/**
 * key value pair store, where in: key is the route and value is the sidebarnavmenu object
 */
export const sidebarReportsNavigationStore = new Map<string, SidebarNavMenu>(flatten(reportsNavigationMenus).map(nav => [nav.route, nav]));


/**
 * flattens the navigation routes
 * @param menus
 * @returns
 */
function flatten(menus: SidebarNavMenu[]) {
    var result: SidebarNavMenu[] = [];

    menus.forEach(function (a) {
        result.push({ ...a, children: [] });
        if (Array.isArray(a.children)) {
            result = result.concat(flatten(a.children));
        }
    });
    return result;
}
