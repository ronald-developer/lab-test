import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { StemInScrapNavigationPath } from "./stem-in-scrap-navigation-path";
const parent = StemInScrapNavigationPath.parent;
const children = StemInScrapNavigationPath.children;

/**
 * stem in scrap - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class StemInScrapsNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Stem in scrap',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleStemInScrapTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteStemInScrapTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateStemInScrapTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditStemInScrapTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 4,
                    allowedRoles: ['Admin', 'ReportStemInScrapTest', 'ViewStemInScrapTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportStemInScrapTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportStemInScrapTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
