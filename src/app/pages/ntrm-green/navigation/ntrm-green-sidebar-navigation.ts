import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { NtrmGreenNavigationPath } from './ntrm-green-navigation-path';
const parent = NtrmGreenNavigationPath.parent;
const children = NtrmGreenNavigationPath.children;

/**
 * NtrmGreen - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class NtrmGreenNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Ntrm green',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleNtrmGreenTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteNtrmGreenTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateNtrmGreenTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditNtrmGreenTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportNtrmGreenTest', 'ViewNtrmGreenTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportNtrmGreenTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportNtrmGreenTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
