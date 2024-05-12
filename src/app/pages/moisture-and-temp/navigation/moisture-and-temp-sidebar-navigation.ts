import { SidebarNavMenu } from '../../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { MoistureAndTempNavigationPath } from './moisture-and-temp-navigation-path';
const parent = MoistureAndTempNavigationPath.parent;
const children = MoistureAndTempNavigationPath.children;

/**
 * ntrm product- navigation route configuration
 * used to render partial menu of the sidebar navigation menu
 */
export class MoistureAndTempsNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Moisture and temp',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleTests'],
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleMoistureAndTempTest'],
					pageActions: [{
						name: 'delete',
						allowedRoles: ['Admin', 'DeleteMoistureAndTempTest'],
					}]
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'CreateMoistureAndTempTest']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'EditMoistureAndTempTest']
                },
				{
                    route: `${parent}/${children.upload}`,
                    title: 'Upload',
                    order: 4,
                    allowedRoles: ['Admin', 'UploadMoistureAndTempTest']
                },
                {
                    route: `${parent}/${children.reports}`,
                    title: 'Reports',
                    order: 5,
                    allowedRoles: ['Admin', 'ReportMoistureAndTempTest', 'ViewMoistureAndTempTest'],
                    children: [
                        {
                            route: `${parent}/${children.reports}/${children.reportsSummary}`,
                            title: 'Summary',
                            order: 1,
                            allowedRoles: ['Admin', 'ReportMoistureAndTempTest']
                        },
                        {
                            route: `${parent}/${children.reports}/${children.reportsDetails}`,
                            title: 'Details',
                            order: 2,
                            allowedRoles: ['Admin', 'ReportMoistureAndTempTest']
                        },
                    ]
                }
            ]
        };

        return nav;
    }
}
