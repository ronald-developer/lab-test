/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class ButtedLooseLeafNavigationPath {
  /** @route tests/buttedlooseleaf */
  public static get parent() {
      return routePaths.parent;
  }
  public static get children() {
      return routePaths.children;
  }
}

const routePaths = {
  parent: 'tests/buttedlooseleaf',
  children: {
      list: 'list',
      create: 'create',
      edit: 'edit',
      reports: 'reports',
      reportsSummary: 'summary',
      reportsDetails: 'details'
  }
}

