/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class ShakerNavigationPath {
    /** @route setup */
    public static get parent() {
        return routePaths.parent;
    }
    public static get children() {
        return routePaths.children;
    }
}

const routePaths = {
    parent: 'setup/shaker',
    children: {
        list: 'list',
        create: 'create',
        edit: 'edit'
    }
}

