import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { StemLengthNavigationPath } from "./stem-length-navigation-path";
const parent = StemLengthNavigationPath.parent;
const children = StemLengthNavigationPath.children;

/**
 * stem length - navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class StemLengthNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Stem length',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleStemLengthTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteStemLengthTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateStemLengthTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditStemLengthTest']
                },
                {
                  route: `${parent}/${children.reports}`,
                  title: 'Reports',
                  order: 4,
                  allowedRoles: ['Admin', 'ReportStemLengthTest', 'ViewStemLengthTest'],
                  children: [
                      {
                          route: `${parent}/${children.reports}/${children.reportsSummary}`,
                          title: 'Summary',
                          order: 1,
                          allowedRoles: ['Admin', 'ReportStemLengthTest', 'ViewStemLengthTest']
                      },
                      {
                          route: `${parent}/${children.reports}/${children.reportsDetails}`,
                          title: 'Details',
                          order: 2,
                          allowedRoles: ['Admin', 'ReportStemLengthTest', 'ViewStemLengthTest']
                      },
                  ]
              }
            ]
        };

        return nav;
    }
}
