import { SidebarNavMenu } from '../../core/components/sidebar-menu-nav/models/sidebar-menu-nav-type';
import { LocationNavigations } from './location/navigation/location-navigations';
import { SetupNavigationPath } from './setup-navigation-path';
import { ShakerNavigations } from './shaker/navigation/shaker-navigations';
const parent = SetupNavigationPath.parent;

/**
 * setup - navigation route configuration
 * used to render setup sidebar navigation menu
 */
export class SetupNavigations {
    public static get routes() {
        const nav: SidebarNavMenu = {
            route: parent,
            title: 'Setup',
            order: 1,
            isParent: true,
            allowedRoles: ['Admin', 'LabModuleSetup'],
            icon: 'fa fa-solid fa-gear',
            children: [
              LocationNavigations.routes,
			  ShakerNavigations.routes
            ]
        };

        return nav;
    }
}
