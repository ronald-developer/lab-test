import { ReportsNavigationPath } from "../../../reports-navigation-path";

/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class TestLastThreeResultNavigationPath {
	/** @route setup */
	public static get parent() {
		return routePaths.parent;
	}
	public static get children() {
		return routePaths.children;
	}
}

const routePaths = {
	parent: `${ReportsNavigationPath.parent}/${ReportsNavigationPath.children.lastTestsResult}`,
	children: {
		lastThree: 'last-three-results'
	}
}

