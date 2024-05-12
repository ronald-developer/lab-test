import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { LooseLeafNavigationPath } from "./loose-leaf-navigation-path";
const parent = LooseLeafNavigationPath.parent;
const children = LooseLeafNavigationPath.children;

/**
 * Loose leaf - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class LooseLeafNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Loose leaf',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleLooseLeafTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteLooseLeafTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateLooseLeafTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditLooseLeafTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportLooseLeafTest', 'ViewLooseLeafTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportLooseLeafTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportLooseLeafTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
