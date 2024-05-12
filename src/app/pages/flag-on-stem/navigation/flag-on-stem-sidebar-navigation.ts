import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { FlagOnStemNavigationPath } from "./flag-on-stem-navigation-path";
const parent = FlagOnStemNavigationPath.parent;
const children = FlagOnStemNavigationPath.children;

/**
 * flag on stem - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class FlagOnStemsNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Flag on stems',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleFlagOnStemTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteFlagOnStemTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateFlagOnStemTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditFlagOnStemTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportFlagOnStemTest', 'ViewFlagOnStemTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportFlagOnStemTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportFlagOnStemTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
