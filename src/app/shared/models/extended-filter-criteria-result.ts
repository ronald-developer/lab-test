import { FilterCriteriaChangeEventResult } from "./filter-criteria-change-event-result";

export type ExtendedFilterCriteriaChangeEventResult = FilterCriteriaChangeEventResult & { page: number, pageSize: number, toDate: Date }
