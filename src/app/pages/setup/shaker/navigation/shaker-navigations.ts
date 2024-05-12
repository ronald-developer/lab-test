import { SidebarNavMenu } from "src/app/core/components/sidebar-menu-nav/models/sidebar-menu-nav-type";
import { ShakerNavigationPath } from "./shaker-navigation-path";

const parent = ShakerNavigationPath.parent;
const children = ShakerNavigationPath.children;

/**
 * shaker - navigation route configuration
 * used to render shaker sidebar navigation menu
 */
export class ShakerNavigations {
	public static get routes() {
		const nav: SidebarNavMenu = {
			route: parent,
			title: 'Shaker',
			order: 1,
			isParent: true,
			allowedRoles: ['Admin', 'LabModuleSetupShaker'],
			icon: 'fa-solid fa-mortar-pestle',
			children: [
				{
					route: `${parent}/${children.list}`,
					title: 'List',
					order: 1,
					allowedRoles: ['Admin', 'LabModuleSetupShaker']
				},
				{
					route: `${parent}/${children.create}`,
					title: 'Create',
					order: 2,
					allowedRoles: ['Admin', 'LabModuleSetupShaker']
				},
				{
					route: `${parent}/${children.edit}`,
					title: 'Edit',
					order: 3,
					useAsDialog: true,
					allowedRoles: ['Admin', 'LabModuleSetupShaker']
				}
			]
		};

		return nav;
	}
}
