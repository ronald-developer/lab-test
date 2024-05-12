import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateTimeHelper } from 'src/app/utils/date-time-helper-utils';
import { ExtendedFilterCriteriaChangeEventResult } from '../../models/extended-filter-criteria-result';
import { FilterCriteriaChangeEventResult } from '../../models/filter-criteria-change-event-result';
import { Fields } from '../portlet-filter/portlet-filter-criteria/models/fields';
import { BaseReportConfig } from './base-report-template-config';

@Component({
    selector: 'app-base-report-template',
    templateUrl: './base-report-template.component.html'
})
export class BaseReportTemplateComponent {
    @Output() export = new EventEmitter<ExtendedFilterCriteriaChangeEventResult>();
    @Input() set config(value: BaseReportConfig) {
        this.cfg = value;
    }
    @Input() set hideFilterFields(fields: Fields[]) {
        if (fields) {
            this.filterFieldsToHide = fields;
        }
    }

    public formFilter!: FormGroup;
    public filterFieldsToHide: Fields[] = [];
    public cfg!: BaseReportConfig;
    public onExport(formResult: FilterCriteriaChangeEventResult) {

        const now = new Date();
        const dateNow = DateTimeHelper.getDateTimezoneOffset(new Date(now.toUTCString()));
        let searchCriteria: ExtendedFilterCriteriaChangeEventResult;
        const dateRange: [Date, Date] = formResult?.dateSearch ? formResult?.fromDate : [dateNow, dateNow];

        searchCriteria = {
            ...formResult,
            dateSearch: formResult?.dateSearch,
            fromDate: new Date(dateRange[0].toUTCString()),
            toDate: new Date(dateRange[1].toUTCString()),
            page: 1,
            pageSize: 10
        }
        this.export.emit(searchCriteria);
    }
}
