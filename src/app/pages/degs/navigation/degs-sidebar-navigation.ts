import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { DegsNavigationPath } from './degs-navigation-path';
const parent = DegsNavigationPath.parent;
const children = DegsNavigationPath.children;

/**
 * degs - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class DegsNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Degs',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleDegsTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteDegsTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateDegsTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditDegsTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportDegsTest', 'ViewDegsTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportDegsTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportDegsTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
