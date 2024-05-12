import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { LeavesNavigationPath } from "./leaves-navigation-path";
const parent = LeavesNavigationPath.parent;
const children = LeavesNavigationPath.children;

/**
 * leaves - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class LeavesNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Leaves',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleLeavesTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteLeavesTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateLeavesTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditLeavesTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportLeavesTest', 'ViewLeavesTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportLeavesTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportLeavesTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
