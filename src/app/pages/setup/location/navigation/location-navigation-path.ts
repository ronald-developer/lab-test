/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class LocationNavigationPath {
    /** @route setup */
    public static get parent() {
        return routePaths.parent;
    }
    public static get children() {
        return routePaths.children;
    }
}

const routePaths = {
    parent: 'setup/location',
    children: {
        list: 'list',
        create: 'create',
        edit: 'edit'
    }
}

