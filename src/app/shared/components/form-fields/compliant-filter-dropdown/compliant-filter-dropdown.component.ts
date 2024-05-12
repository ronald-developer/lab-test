import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../../models/select-option';
import { ShiftTypeService } from '../../../services/dropdowns/shift-type.service';
import { CompliantFilterService } from 'src/app/shared/services/dropdowns/compliant-filter.service';

const COMPLIANT_FILTER_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CompliantFilterDropdownComponent),
    multi: true
}

@Component({
    selector: 'app-compliant-filter-dropdown',
    templateUrl: './compliant-filter-dropdown.component.html',
    providers: [COMPLIANT_FILTER_CONTROL_ACCESSOR]
})
export class CompliantFilterDropdownComponent implements OnInit, ControlValueAccessor {
    public filterOptions: SelectOption[] = [];
    public selectedFilter!: string | null;
    private onChange!: Function;
    private onTouch!: Function;
    @Input() invalid!: boolean;
    constructor(private compliantFilterService: CompliantFilterService) { }

    async ngOnInit(): Promise<void> {
        this.filterOptions = await this.compliantFilterService.getAll();
    }

    writeValue(obj: any): void {
        this.selectedFilter = obj !== null ? obj : null;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public selectionChanged() {
        this.onChange(this.selectedFilter);
    }

    public onClick() {
        this.onTouch();
    }
}
