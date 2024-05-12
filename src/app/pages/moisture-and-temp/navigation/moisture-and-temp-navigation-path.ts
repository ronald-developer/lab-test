/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class MoistureAndTempNavigationPath {
    /** @route tests/moisture-and-temp */
    public static get parent() {
        return routePaths.parent;
    }
    public static get children() {
        return routePaths.children;
    }
}

const routePaths = {
    parent: 'tests/moisture-and-temp',
    children: {
        list: 'list',
        create: 'create',
        edit: 'edit',
		upload:'upload',
        reports: 'reports',
        reportsSummary: 'summary',
        reportsDetails: 'details'
    }
}

