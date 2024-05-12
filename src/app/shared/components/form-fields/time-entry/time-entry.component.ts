import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as kthelpers from '../../../../_metronic/kt/components/MenuComponent';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

const ENTRY_TIME_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeEntryComponent),
    multi: true
}
export function getTimepickerConfig(): TimepickerConfig {
    return Object.assign(new TimepickerConfig(), {
        hourStep: 1,
        minuteStep: 1,
        showMeridian: false,
        readonlyInput: false,
        mousewheel: false,
        showMinutes: true,
        showSeconds: false,
        labelHours: 'Hours',
        labelMinutes: 'Minutes',
        labelSeconds: 'Seconds'
    });
}

@Component({
    selector: 'app-time-entry',
    templateUrl: './time-entry.component.html',
    styleUrls: ['./time-entry.component.scss'],
    providers: [ENTRY_TIME_CONTROL_ACCESSOR, { provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class TimeEntryComponent implements ControlValueAccessor {
    @ViewChild('timePickerMenuElement') timePickerMenuElement!: ElementRef;
    @ViewChild('timePickerMenuContainerElement', { read: ElementRef }) timePickerMenuContainerElement!: ElementRef;
    public formattedTimeDisplay: string = '';
    public entryTime!: Date;
    private onChange!: Function;
    private onTouch!: Function;
    @Input() invalid!: boolean;
    constructor() { }

    writeValue(obj: any): void {
        this.entryTime = obj || null;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public onEntryClicked() {
        this.onTouch();
    }

    modelChanged(){
        this.onChange(this.entryTime);
    }
}
