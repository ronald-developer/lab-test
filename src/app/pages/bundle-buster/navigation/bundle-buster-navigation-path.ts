/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class BundleBusterNavigationPath {
    /** @route tests/bundle-buster */
    public static get parent() {
        return routePaths.parent;
    }
    public static get children() {
        return routePaths.children;
    }
}

const routePaths = {
    parent: 'tests/bundle-buster',
    children: {
        list: 'list',
        create: 'create',
        edit: 'edit',
        reports: 'reports',
        reportsSummary: 'summary',
        reportsDetails: 'details'
    }
}

