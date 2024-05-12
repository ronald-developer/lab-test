import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
const DATE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateEntryComponent),
    multi: true
}

@Component({
    selector: 'app-date-entry',
    templateUrl: './date-entry.component.html',
    styleUrls: ['./date-entry.component.scss'],
    providers: [DATE_CONTROL_ACCESSOR]
})
export class DateEntryComponent implements OnInit {
    public dateCustomClasses: DatepickerDateCustomClasses[];
    public dateEntry!: Date;
    private onChange!: Function;
    private onTouch!: Function;
    @Input() useDateRange!: boolean;
    @Input() invalid!: boolean;
    constructor() { }

    ngOnInit(): void {

    }

    writeValue(obj: any): void {
        this.dateEntry = obj || null;
        this.highlightCurrentDateWhenEmpty();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public selectionChanged() {
        this.onChange(this.dateEntry);
        this.highlightCurrentDateWhenEmpty();
    }

    private highlightCurrentDateWhenEmpty(){
        if(this.dateEntry){
            this.dateCustomClasses =[];
        }else{
            const now = new Date();
            this.dateCustomClasses = [
                { date: now, classes: ['bg-success'] }
            ];
        }
    }

    public onClick() {
        this.onTouch();
    }

}
