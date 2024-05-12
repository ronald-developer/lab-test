import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as kthelpers from '../../../../../../_metronic/kt/components/MenuComponent';
import { Fields } from '../../models/fields';

@Component({
    selector: 'app-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit, OnChanges {
    public controlName = Fields.FromTime;
    @Input() formFilters!: FormGroup;
    @HostBinding('attr.id') id = Fields.FromTime;
    @HostBinding('class.d-none') hide!: boolean;
    @ViewChild('timePickerMenuElement') timePickerMenuElement!: ElementRef;
    @ViewChild('timePickerMenuContainerElement', { read: ElementRef }) timePickerMenuContainerElement!: ElementRef;
    formattedTimeDisplay!: string;
    constructor() { }

    ngOnChanges(): void {
        this.hide = !!(this.formFilters.get(Fields.FromTime)?.disabled);
    }

    ngOnInit(): void {
    }

    public get model() {
        return this.formFilters.get(this.controlName);
    }

    public showMenu() {
        kthelpers.MenuComponent.getInstance(this.timePickerMenuElement.nativeElement)?.show(this.timePickerMenuContainerElement.nativeElement);
    }

    public close() {
        kthelpers.MenuComponent.getInstance(this.timePickerMenuElement.nativeElement)?.hide(this.timePickerMenuContainerElement.nativeElement);
    }

    public setTimeNow() {
        const time = new Date();
        time.setHours(time.getHours());
        time.setMinutes(time.getMinutes());
        this.model?.setValue(time);
    }

    public get show() {
        return !this.model?.disabled;
    }

}
