import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../../../shared/models/select-option';
import { ShiftTypeService } from '../../../services/dropdowns/shift-type.service';

const SHIFT_TYPE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ShiftTypeDropdownComponent),
    multi: true
}

@Component({
    selector: 'app-shift-type-dropdown',
    templateUrl: './shift-type-dropdown.component.html',
    styleUrls: ['./shift-type-dropdown.component.scss'],
    providers: [SHIFT_TYPE_CONTROL_ACCESSOR]
})
export class ShiftTypeDropdownComponent implements OnInit, ControlValueAccessor {
    public shiftTypes: SelectOption[] = [];
    public shiftTypeId!: string | null;
    private onChange!: Function;
    private onTouch!: Function;
    @Input() invalid!: boolean;
    constructor(private shiftTypeService: ShiftTypeService) { }

    async ngOnInit(): Promise<void> {
        this.shiftTypes = await this.shiftTypeService.getAll();
    }

    writeValue(obj: any): void {
        this.shiftTypeId = obj !== null ? obj : null;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public selectionChanged() {
        this.onChange(this.shiftTypeId);
    }

    public onClick() {
        this.onTouch();
    }
}
