import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { ShortStemNavigationPath } from "./short-stem-navigation-path";
const parent = ShortStemNavigationPath.parent;
const children = ShortStemNavigationPath.children;

/**
 * stem length - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class ShortStemsNavigations {
	public static get routes() {
		const nav: SidebarNavMenu = {
			route: parent,
			title: 'Short stems',
			order: 1,
			isParent: true,
			allowedRoles: ['Admin', 'LabModuleTests'],
			children: [
				{
					route: `${parent}/${children.list}`,
					title: 'List',
					order: 1,
					allowedRoles: ['Admin', 'LabModuleShortStemTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteShortStemTest'],
					}]
				},
				{
					route: `${parent}/${children.create}`,
					title: 'Create',
					order: 2,
					allowedRoles: ['Admin', 'CreateShortStemTest']
				},
				{
					route: `${parent}/${children.edit}`,
					title: 'Edit',
					order: 3,
					useAsDialog: true,
					allowedRoles: ['Admin', 'EditShortStemTest']
				},
				{
					route: `${parent}/${children.reports}`,
					title: 'Reports',
					order: 4,
					allowedRoles: ['Admin', 'ReportShortStemTest', 'ViewShortStemTest'],
					children: [
						{
							route: `${parent}/${children.reports}/${children.reportsSummary}`,
							title: 'Summary',
							order: 1,
							allowedRoles: ['Admin', 'ReportShortStemTest']
						},
						{
							route: `${parent}/${children.reports}/${children.reportsDetails}`,
							title: 'Details',
							order: 2,
							allowedRoles: ['Admin', 'ReportShortStemTest']
						},
					]
				}
			]
		};

		return nav;
	}
}
