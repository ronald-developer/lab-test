import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { ButtedLooseLeafNavigationPath } from "./butted-loose-leaf-navigation-path";
const parent = ButtedLooseLeafNavigationPath.parent;
const children = ButtedLooseLeafNavigationPath.children;

/**
 * ButtedLooseLeaf - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class ButtedLooseLeafNavigations {
	public static get routes() {
		const nav: SidebarNavMenu = {
			route: parent,
			title: 'Butted loose leaf',
			order: 1,
			isParent: true,
			allowedRoles: ['Admin', 'LabModuleTests'],
			children: [
				{
					route: `${parent}/${children.list}`,
					title: 'List',
					order: 1,
					allowedRoles: ['Admin', 'LabModuleButtedLooseLeafTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteButtedLooseLeafTest'],
					}]
				},
				{
					route: `${parent}/${children.create}`,
					title: 'Create',
					order: 2,
					allowedRoles: ['Admin', 'CreateButtedLooseLeafTest']
				},
				{
					route: `${parent}/${children.edit}`,
					title: 'Edit',
					order: 3,
					useAsDialog: true,
					allowedRoles: ['Admin', 'EditButtedLooseLeafTest']
				},
				{
					route: `${parent}/${children.reports}`,
					title: 'Reports',
					order: 4,
					allowedRoles: ['Admin', 'ReportButtedLooseLeafTest', 'ViewButtedLooseLeafTest'],
					children: [
						{
							route: `${parent}/${children.reports}/${children.reportsSummary}`,
							title: 'Summary',
							order: 1,
							allowedRoles: ['Admin', 'ReportButtedLooseLeafTest']
						},
						{
							route: `${parent}/${children.reports}/${children.reportsDetails}`,
							title: 'Details',
							order: 2,
							allowedRoles: ['Admin', 'ReportButtedLooseLeafTest']
						},
					]
				}
			]
		};

		return nav;
	}
}
