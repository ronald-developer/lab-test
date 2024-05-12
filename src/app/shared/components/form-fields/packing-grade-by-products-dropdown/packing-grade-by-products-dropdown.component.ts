import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OperationOrderMotherGradeService } from 'src/app/shared/services/dropdowns/operation-order-mother-grade.service';
import { ResponseOperationOrderByProduct } from '../../../../api-services/backend/operation-order-api/models/response-operation-order-by-product-model';
import { SelectOption } from '../../../../shared/models/select-option';

const PACKING_GRADE_BY_PRODUCT_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PackingGradeByProductsDropdownComponent),
    multi: true
}
@Component({
    selector: 'app-packing-grade-by-products-dropdown',
    templateUrl: './packing-grade-by-products-dropdown.component.html',
    providers: [PACKING_GRADE_BY_PRODUCT_CONTROL_ACCESSOR]
})
export class PackingGradeByProductsDropdownComponent implements ControlValueAccessor {

    public packingGrades: SelectOption[] = [];
    public packingGradeId!: string;
    private onChange!: Function;
    private onTouch!: Function;
    @Input() invalid!: boolean;
    @Input() set operationOrderId(value: number) {
        this.operationOrderMotherGradeService.getAll().then(data => {
            const operationOrder = data.find(f => f.key == value);
            if (operationOrder) {
                this.packingGrades = this.getPackingGradesOptions(operationOrder?.data.byProducts);
            }
        });
    }
    @Input() set operationOrderByProducts(value: ResponseOperationOrderByProduct[]) {
        if (value) {
            this.packingGrades = this.getPackingGradesOptions(value);
        } else {
            this.packingGrades = [];
        }
    };
    constructor(private operationOrderMotherGradeService: OperationOrderMotherGradeService) {
    }

    private getPackingGradesOptions(value: ResponseOperationOrderByProduct[]) {
        return value.map(data => new SelectOption(data.packingGradeId, data.packingGradeCode));
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
