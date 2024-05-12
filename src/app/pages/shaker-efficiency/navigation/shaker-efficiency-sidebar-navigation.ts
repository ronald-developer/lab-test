import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { ShakerEfficiencyNavigationPath } from './shaker-efficiency-navigation-path';

const parent = ShakerEfficiencyNavigationPath.parent;
const children = ShakerEfficiencyNavigationPath.children;

/**
 * ShakerEfficiency - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class ShakerEfficiencyNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Shaker efficiency',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleShakerEfficiencyTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteShakerEfficiencyTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateShakerEfficiencyTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditShakerEfficiencyTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportShakerEfficiencyTest', 'ViewShakerEfficiencyTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportShakerEfficiencyTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportShakerEfficiencyTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
