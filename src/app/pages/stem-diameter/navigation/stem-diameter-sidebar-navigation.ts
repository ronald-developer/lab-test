import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { StemDiameterNavigationPath } from "./stem-diameter-navigation-path";
const parent = StemDiameterNavigationPath.parent;
const children = StemDiameterNavigationPath.children;

/**
 * stem diameter - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class StemDiameterNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Stem diameter',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleStemDiameterTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteStemDiameterTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateStemDiameterTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditStemDiameterTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportStemDiameterTest', 'ViewStemDiameterTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportStemDiameterTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportStemDiameterTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
