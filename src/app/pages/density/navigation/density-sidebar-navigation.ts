import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { DensityNavigationPath } from './density-navigation-path';

const parent = DensityNavigationPath.parent;
const children = DensityNavigationPath.children;

/**
 * stem length - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class DensitysNavigations {
	public static get routes() {
		const nav: SidebarNavMenu = {
			route: parent,
			title: 'Density',
			order: 1,
			isParent: true,
			allowedRoles: ['Admin', 'LabModuleTests'],
			children: [
				{
					route: `${parent}/${children.list}`,
					title: 'List',
					order: 1,
					allowedRoles: ['Admin', 'LabModuleDensityTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteDensityTest'],
					}]
				},
				{
					route: `${parent}/${children.create}`,
					title: 'Create',
					order: 2,
					allowedRoles: ['Admin', 'CreateDensityTest']
				},
				{
					route: `${parent}/${children.edit}`,
					title: 'Edit',
					order: 3,
					useAsDialog: true,
					allowedRoles: ['Admin', 'EditDensityTest']
				},
				{
					route: `${parent}/${children.reports}`,
					title: 'Reports',
					order: 4,
					allowedRoles: ['Admin', 'ReportDensityTest', 'ViewDensityTest'],
					children: [
						{
							route: `${parent}/${children.reports}/${children.reportsSummary}`,
							title: 'Summary',
							order: 1,
							allowedRoles: ['Admin', 'ReportDensityTest']
						},
						{
							route: `${parent}/${children.reports}/${children.reportsDetails}`,
							title: 'Details',
							order: 2,
							allowedRoles: ['Admin', 'ReportDensityTest']
						},
					]
				}
			]
		};

		return nav;
	}
}
