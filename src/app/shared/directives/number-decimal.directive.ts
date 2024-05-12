import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appNumberDecimal]'
})
export class NumberDecimalDirective {
    @Input() set decimalPlaces(val: number) {
        if (val) {
            this.pattern = new RegExp(`^[0-9]*\\.?[0-9]{0,${val}}$`);
        }
    }

    private pattern: RegExp = new RegExp(`^[0-9]*\\.?[0-9]{0,2}$`);

    constructor(private el: ElementRef) { }
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        let value = this.el.nativeElement.value;
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = value;
        const position = this.el.nativeElement.selectionStart;
        const next: string = [current.slice(0, position), event.code == 'Period' ? '.' : event.key, current.slice(position)].join('');
        if (!this.pattern.test(next)) {
            event.preventDefault();
        }
    }
}
