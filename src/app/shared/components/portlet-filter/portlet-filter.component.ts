import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';
import { FilterCriteriaChangeEventResult } from './../../models/filter-criteria-change-event-result';
import { Fields } from './portlet-filter-criteria/models/fields';
import { PortletFilterPopupComponent } from './portlet-filter-popup/portlet-filter-popup.component';
import { FormFieldOrientation } from './portlet-filter-criteria/models/form-field-orietation';
import { debounceTime, delay } from 'rxjs';

/**
 * Wrapper for filter criteria, accepts the template defined from other components
 */
@Component({
	selector: 'app-portlet-filter',
	templateUrl: './portlet-filter.component.html',
	styleUrls: ['./portlet-filter.component.scss']
})
export class PortletFilterComponent implements OnInit {
	public formFilters!: FormGroup;
	public filterByOrderNo = Fields.FilterByOperationNo;
	public filterByDate = Fields.FilterByDate;
	@ViewChild(PortletFilterPopupComponent, { read: ElementRef }) menuContainerElement!: ElementRef;
	@ViewChild('menuElement') menu!: ElementRef;
	@Input() filterCriteriaTemplateRef!: TemplateRef<any>;
	@Input() tableFilterTitle!: string;
	@Input() filterButtonLabel: string = 'Search';
	@Input() pinned = false;
	@Input() noRefreshButton?: boolean;
	@Input() noSearchButton?: boolean;
	@Input() formFieldOrientation: FormFieldOrientation = 'vertical'
	@Input() set form(value: FormGroup) {

		if (value) {
			this.formFilters = value;
			this.formFilters.valueChanges.pipe(debounceTime(300)).subscribe(data => {
				this.valueChanged.emit(data);
			});
		}
	}

	@Output() search = new EventEmitter<FilterCriteriaChangeEventResult>();
	@Output() valueChanged = new EventEmitter<FilterCriteriaChangeEventResult>();
	@Output() refresh = new EventEmitter<void>();

	constructor(private fb: FormBuilder, private detector: ChangeDetectorRef) {
	}

	public pin() {
		this.close();
		this.pinned = !this.pinned;
		setTimeout(() => {
			kthelpers.MenuComponent.reinitialization();
			this.formFilters?.updateValueAndValidity();
			this.detector.detectChanges();
		}, 500);
	}

	public onRefresh() {
		this.refresh?.emit();
	}

	public close() {
		kthelpers.MenuComponent.getInstance(this.menu.nativeElement)?.hide(this.menuContainerElement.nativeElement);
	}

  /**
   * @see Fields -> this are the common lab tests filters used by the portlet filter.
   * @see formFilters -> was built from @see Fields.
   */
	public onSearch() {
    if(this.formFilters){
      this.search.emit({ ...this.formFilters.value });
    }else{
      this.search.emit();
    }

		this.close();
	}

	ngOnInit(): void {
	}

}
