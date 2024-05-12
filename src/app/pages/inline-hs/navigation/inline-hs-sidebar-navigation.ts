import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { InlineHsNavigationPath } from "./inline-hs-navigation-path";
const parent = InlineHsNavigationPath.parent;
const children = InlineHsNavigationPath.children;

/**
 * InlineHs - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class InlineHsNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'InlineHs',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleInlineHsTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteInlineHsTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateInlineHsTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditInlineHsTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportInlineHsTest', 'ViewInlineHsTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportInlineHsTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportInlineHsTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
