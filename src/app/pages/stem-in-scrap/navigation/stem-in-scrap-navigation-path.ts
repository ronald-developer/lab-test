/**
 * Route paths definitions for router (routing module and sidebar-menu-navigation-list)
 */
export class StemInScrapNavigationPath {
  /** @route tests/stem-in-scrap */
  public static get parent() {
      return routePaths.parent;
  }
  public static get children() {
      return routePaths.children;
  }
}

const routePaths = {
  parent: 'tests/stem-in-scrap',
  children: {
      list: 'list',
      create: 'create',
      edit: 'edit',
      reports: 'reports',
      reportsSummary: 'summary',
      reportsDetails: 'details'
  }
}

