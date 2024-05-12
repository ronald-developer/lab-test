import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../../../shared/models/select-option';
import { PackingGradeService } from './../../../services/dropdowns/packing-grade.service';

const PACKING_GRADE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PackingGradeDropdownComponent),
    multi: true
}

@Component({
    selector: 'app-packing-grade-dropdown',
    templateUrl: './packing-grade-dropdown.component.html',
    providers: [PACKING_GRADE_CONTROL_ACCESSOR]
})
export class PackingGradeDropdownComponent implements OnInit, ControlValueAccessor {
    public packingGrades: SelectOption[] = [];
    public packingGradeId!: string;
    private onChange!: Function;
    private onTouch!: Function;
    @Input() invalid!: boolean;

    constructor(private packingGradeService: PackingGradeService) { }

    async ngOnInit(): Promise<void> {
        this.packingGrades = await this.packingGradeService.getAll();
    }

    writeValue(obj: any): void {
        this.packingGradeId = obj || 0;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public selectionChanged() {
        this.onChange(this.packingGradeId);
    }

    public onClick() {
        this.onTouch();
    }
}
