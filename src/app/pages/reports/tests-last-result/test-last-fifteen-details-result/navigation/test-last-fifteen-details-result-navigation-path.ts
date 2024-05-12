import { ReportsNavigationPath } from "../../../reports-navigation-path";

/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class TestLastFifteenDetailsResultNavigationPath {
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
		degs: `${ReportsNavigationPath.children.lastFifteenDetailedResult}/degs-dry`
	}
}

