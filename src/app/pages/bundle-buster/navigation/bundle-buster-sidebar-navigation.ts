import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { BundleBusterNavigationPath } from "./bundle-buster-navigation-path";
const parent = BundleBusterNavigationPath.parent;
const children = BundleBusterNavigationPath.children;

/**
 * bundle-buster - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class BundleBusterNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Bundle buster',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleBundleBusterTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteBundleBusterTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateBundleBusterTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditBundleBusterTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportBundleBusterTest', 'ViewBundleBusterTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportBundleBusterTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportBundleBusterTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
