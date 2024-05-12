import { SidebarNavMenu } from "src/app/core/components/sidebar-menu-nav/models/sidebar-menu-nav-type";
import { LocationNavigationPath } from "./location-navigation-path";

const parent = LocationNavigationPath.parent;
const children = LocationNavigationPath.children;

/**
 * location - navigation route configuration
 * used to render location sidebar navigation menu
 */
export class LocationNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'NTRM location',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleSetupNtrmLocation'],
            icon: 'fa fas fa-map-marker-alt',
            children: [
                {
                    route: `${parent}/${children.list}`,
                    title: 'List',
                    order: 1,
                    allowedRoles: ['Admin', 'LabModuleSetupNtrmLocation']
                },
                {
                    route: `${parent}/${children.create}`,
                    title: 'Create',
                    order: 2,
                    allowedRoles: ['Admin', 'LabModuleSetupNtrmLocation']
                },
                {
                    route: `${parent}/${children.edit}`,
                    title: 'Edit',
                    order: 3,
                    useAsDialog: true,
                    allowedRoles: ['Admin', 'LabModuleSetupNtrmLocation']
                }
            ]
        };

        return nav;
    }
}
