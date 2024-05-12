import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { NtrmProductNavigationPath } from './ntrm-product-navigation-path';
const parent = NtrmProductNavigationPath.parent;
const children = NtrmProductNavigationPath.children;

/**
 * ntrm product- navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class NtrmProductsNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'NTRM Product',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleNtrmProductTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteNtrmProductTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateNtrmProductTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditNtrmProductTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportNtrmProductTest', 'ViewNtrmProductTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportNtrmProductTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportNtrmProductTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
