import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { NtrmInLineNavigationPath } from './ntrm-in-line-navigation-path';
const parent = NtrmInLineNavigationPath.parent;
const children = NtrmInLineNavigationPath.children;

/**
 * ntrm product- navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class NtrmInLineNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'NTRM in-line',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleNtrmInLineTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteNtrmInLineTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateNtrmInLineTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditNtrmInLineTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportNtrmInLineTest', 'ViewNtrmInLineTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportNtrmInLineTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportNtrmInLineTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
