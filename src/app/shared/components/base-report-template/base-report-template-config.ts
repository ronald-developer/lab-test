import { FormGroup } from "@angular/forms";
import { Fields } from "../portlet-filter/portlet-filter-criteria/models/fields";

export type BaseReportConfig = {
  tableFilterTitle: string,
  filterButtonLabel: string,
  pinned: boolean,
  noRefreshButton: boolean;
  form: FormGroup
}

export class BaseReportConfiguration {
  public static initialize(tableFilterTitle: string,
    filterButtonLabel: string,
    pinned: boolean,
    form: FormGroup = new FormGroup({})) {
    const cfg: BaseReportConfig = {
      tableFilterTitle: tableFilterTitle,
      filterButtonLabel: filterButtonLabel,
      pinned: pinned,
      noRefreshButton: true,
      form: form
    }
    return cfg;
  }
}
