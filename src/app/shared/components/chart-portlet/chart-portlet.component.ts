import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { Fields } from '../portlet-filter/portlet-filter-criteria/models/fields';
import { PortletFilterFormBuilderService } from '../../services/forms/portlet-filter-form-builder.service';
import { FilterCriteriaChangeEventResult } from '../../models/filter-criteria-change-event-result';
import { Subject, debounceTime, tap } from 'rxjs';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'app-chart-portlet',
	templateUrl: './chart-portlet.component.html',
	styleUrls: ['./chart-portlet.component.scss']
})
export class ChartPortletComponent extends BaseComponent implements OnInit {

	@Input() chartModel: Chart;
	@Input() hideDefaultFilters: Fields[] = [];
	@Input() newFilterFields: Fields[] = [];
	@Input() defaultPageSize?: number;
	@Input() totalPages?: number;
	@Output() pageChanged = new EventEmitter<{ page: number, criteria: FilterCriteriaChangeEventResult }>();
	@Output() chartFilterResult = new EventEmitter<FilterCriteriaChangeEventResult>();
	private _chartFilterResult = new Subject<FilterCriteriaChangeEventResult>();
	private _chartFilterResult$ = this._chartFilterResult.asObservable().pipe(tap(() => this.loading(true)), debounceTime(500), tap(() => this.loading(false)));
	page: number = 1;
	isFullscreen: boolean = false;
	constructor(
		private portletFilterFormBuilderService: PortletFilterFormBuilderService, private detector: ChangeDetectorRef) {
		super();
	}

	public formFilter!: FormGroup;
	ngOnInit(): void {
		this.formFilter = this.portletFilterFormBuilderService.buildForm({ hideDefaultFields: this.hideDefaultFilters, newFields: this.newFilterFields });
		if (this.defaultPageSize) {
			this.formFilter.get(Fields.PageSize)?.setValue(this.defaultPageSize);
		}

		this.portletFilterFormBuilderService.enabledFormFields?.forEach(element => {
			this.formFilter.get(element)?.setValidators(Validators.required);
		});

		this.formFilter.updateValueAndValidity();

		this._chartFilterResult$.subscribe(result => this.chartFilterResult.emit(result));
	}

	public refresh() {
		this._chartFilterResult.next(this.formFilter.value);
	}

	public onFilterCriteriaChanged(formFilterResult: FilterCriteriaChangeEventResult) {
		if (this.formFilter.valid) {
			this._chartFilterResult.next(formFilterResult);
		}
	}

	public onPrevPageClick(): void {
		if (this.page !== 1) {
			this.page = this.page - 1;
		}
		this.pageChanged.emit({ page: this.page, criteria: this.formFilter.value });
	}

	public onNextPageClick(): void {
		this.page++;

		this.pageChanged.emit({ page: this.page, criteria: this.formFilter.value });
	}

	public get enableNextPage() {
		if (this.formFilter.invalid) {
			return false;
		}

		if (this.totalPages && this.defaultPageSize) {
			const result = this.totalPages / this.formFilter.get(Fields.PageSize)?.value;
			return !(Math.ceil(result) == this.page);
		}

		return true;
	}

	public explodeContentShown(isShown: boolean): void {
		this.refresh();
		this.isFullscreen = isShown;
	}

}
