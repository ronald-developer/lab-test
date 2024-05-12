/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class ReportsNavigationPath {
	/** @route reports */
	public static get parent() {
		return routePaths.parent;
	}

	public static get children() {
		return routePaths.children;
	}

}

const routePaths = {
	parent: 'reports',
	children: {
		lastTestsResult: 'last-tests-result',
		lastFifteenDetailedResult: 'last-fifteen-detailed-results'
	}
}

