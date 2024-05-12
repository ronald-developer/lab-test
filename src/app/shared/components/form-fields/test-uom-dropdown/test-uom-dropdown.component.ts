import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from 'src/app/shared/models/select-option';
import { TestUomService } from 'src/app/shared/services/dropdowns/test-uom.service';

const TEST_UOM_CONTROL_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => TestUomDropdownComponent),
	multi: true
}

@Component({
	selector: 'app-test-uom-dropdown',
	templateUrl: './test-uom-dropdown.component.html',
	providers: [TEST_UOM_CONTROL_ACCESSOR]
})
export class TestUomDropdownComponent implements OnInit, ControlValueAccessor {
	public testUoms: SelectOption[] = [];
    public testUomId!: string | null;
    private onChange!: Function;
    private onTouch!: Function;
    @Input() invalid!: boolean;
    constructor(private testUomService: TestUomService) { }

    async ngOnInit(): Promise<void> {
        this.testUoms = await this.testUomService.getAll();
    }

    writeValue(obj: any): void {
        this.testUomId = obj !== null ? obj : null;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public selectionChanged() {
        this.onChange(this.testUomId);
    }

    public onClick() {
        this.onTouch();
    }
}
