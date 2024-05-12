/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class ShortStemNavigationPath {
    /** @route tests/stem-length */
    public static get parent() {
        return routePaths.parent;
    }
    public static get children() {
        return routePaths.children;
    }
}

const routePaths = {
    parent: 'tests/short-stems',
    children: {
        list: 'list',
        create: 'create',
        edit: 'edit',
        reports: 'reports',
        reportsSummary: 'summary',
        reportsDetails: 'details'
    }
}

