import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { StemAuditNavigationPath } from './stem-audit-navigation-path';

const parent = StemAuditNavigationPath.parent;
const children = StemAuditNavigationPath.children;

/**
 * stem audit - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class StemAuditNavigations {
	public static get routes() {
		const nav: SidebarNavMenu = {
			route: parent,
			title: 'Stem audit',
			order: 1,
			isParent: true,
			allowedRoles: ['Admin', 'LabModuleTests'],
			children: [
				{
					route: `${parent}/${children.list}`,
					title: 'List',
					order: 1,
					allowedRoles: ['Admin', 'LabModuleStemAuditTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteStemAuditTest'],
					}]
				},
				{
					route: `${parent}/${children.create}`,
					title: 'Create',
					order: 2,
					allowedRoles: ['Admin', 'CreateStemAuditTest']
				},
				{
					route: `${parent}/${children.edit}`,
					title: 'Edit',
					order: 3,
					useAsDialog: true,
					allowedRoles: ['Admin', 'EditStemAuditTest']
				},
				{
					route: `${parent}/${children.reports}`,
					title: 'Reports',
					order: 4,
					allowedRoles: ['Admin', 'ReportStemAuditTest', 'ViewStemAuditTest'],
					children: [
						{
							route: `${parent}/${children.reports}/${children.reportsSummary}`,
							title: 'Summary',
							order: 1,
							allowedRoles: ['Admin', 'ReportStemAuditTest']
						},
						{
							route: `${parent}/${children.reports}/${children.reportsDetails}`,
							title: 'Details',
							order: 2,
							allowedRoles: ['Admin', 'ReportStemAuditTest']
						},
					]
				}
			]
		};

		return nav;
	}
}
