import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { FinesNavigationPath } from './fines-navigation-path';
const parent = FinesNavigationPath.parent;
const children = FinesNavigationPath.children;

/**
 * fines - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class FinesNavigations {
	public static get routes() {
		const nav: SidebarNavMenu = {
			route: parent,
			title: 'Fines',
			order: 1,
			isParent: true,
			allowedRoles: ['Admin', 'LabModuleTests'],
			children: [
				{
					route: `${parent}/${children.list}`,
					title: 'List',
					order: 1,
					allowedRoles: ['Admin', 'LabModuleFinesTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteFinesTest'],
					}]
				},
				{
					route: `${parent}/${children.create}`,
					title: 'Create',
					order: 2,
					allowedRoles: ['Admin', 'CreateFinesTest']
				},
				{
					route: `${parent}/${children.edit}`,
					title: 'Edit',
					order: 3,
					useAsDialog: true,
					allowedRoles: ['Admin', 'EditFinesTest']
				},
				{
					route: `${parent}/${children.reports}`,
					title: 'Reports',
					order: 4,
					allowedRoles: ['Admin', 'ReportFinesTest', 'ViewFinesTest'],
					children: [
						{
							route: `${parent}/${children.reports}/${children.reportsSummary}`,
							title: 'Summary',
							order: 1,
							allowedRoles: ['Admin', 'ReportFinesTest']
						},
						{
							route: `${parent}/${children.reports}/${children.reportsDetails}`,
							title: 'Details',
							order: 2,
							allowedRoles: ['Admin', 'ReportFinesTest']
						},
					]
				}
			]
		};

		return nav;
	}
}
