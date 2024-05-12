/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class FinesNavigationPath {
	/** @route tests/fines */
	public static get parent() {
		return routePaths.parent;
	}
	public static get children() {
		return routePaths.children;
	}
  }

  const routePaths = {
	parent: 'tests/fines',
	children: {
		list: 'list',
		create: 'create',
		edit: 'edit',
		reports: 'reports',
		reportsSummary: 'summary',
		reportsDetails: 'details'
	}
  }

