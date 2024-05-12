import { sidebarNavigationStore, sidebarReportsNavigationStore, sidebarSetupNavigationStore } from './nav-store';
import { labTestsNavigationMenus, reportsNavigationMenus, setupNavigationMenus } from './sidebar-menu-navigation-lists';

export class NavConfig {

	/**
	 * List of sidebar tests navigation menu
	 */
	public static get labTestsNavigationMenu() {
		return labTestsNavigationMenus;
	}

	/**
	* Sidebar setup navigation menu
	*/
	public static get setupNavigationMenu() {
		return setupNavigationMenus;
	}

	/**
	* Sidebar reports navigation menu
	*/
	public static get reportsNavigationMenu() {
		return reportsNavigationMenus;
	}

	/**
	 * gets the roles in the labtests navigation store
	 * @param route route path defined per test module(page)
	 * @returns allowed roles
	 */
	public static getRoles(route: string) {
		return sidebarNavigationStore.get(route)?.allowedRoles;
	}

	/**
	 * gets the roles in the setup navigation store
	 * @param route route path defined in setup module
	 * @returns allowed roles
	 */
	public static getSetupRoles(route: string) {
		return sidebarSetupNavigationStore.get(route)?.allowedRoles;
	}

	/**
	 * gets the roles in the reports navigation store
	 * @param route route path defined in setup module
	 * @returns allowed roles
	 */
	public static getReportsRoles(route: string) {
		return sidebarReportsNavigationStore.get(route)?.allowedRoles;
	}
}


