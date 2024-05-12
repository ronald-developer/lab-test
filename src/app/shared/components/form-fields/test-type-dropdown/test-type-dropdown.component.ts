import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TestTypeService } from 'src/app/shared/services/dropdowns/test-type.service';
import { SelectOption } from '../../../models/select-option';

const TEST_TYPE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TestTypeDropdownComponent),
    multi: true
}

@Component({
    selector: 'app-test-type-dropdown',
    templateUrl: './test-type-dropdown.component.html',
    styleUrls: ['./test-type-dropdown.component.scss'],
    providers: [TEST_TYPE_CONTROL_ACCESSOR]
})
export class TestTypeDropdownComponent implements OnInit, ControlValueAccessor {
    public testTypes: SelectOption[] = [];
    public testTypeId!: string | null;
    private onChange!: Function;
    private onTouch!: Function;
    @Input() invalid!: boolean;
    constructor(private testTypeService: TestTypeService) { }

    async ngOnInit(): Promise<void> {
        this.testTypes = await this.testTypeService.getAll();
    }

    writeValue(obj: any): void {
        this.testTypeId = obj !== null ? obj : null;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public selectionChanged() {
        this.onChange(this.testTypeId);
    }

    public onClick() {
        this.onTouch();
    }
}
