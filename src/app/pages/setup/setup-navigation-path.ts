/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class SetupNavigationPath {
    /** @route setup */
    public static get parent() {
        return routePaths.parent;
    }
}

const routePaths = {
    parent: 'setup'
}

