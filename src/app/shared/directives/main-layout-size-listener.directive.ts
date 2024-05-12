import { AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MainLayoutContainerService } from '../../core/services/main-layout-container.service';

/**
 * Layout component's listener for width changes
 */
@Directive({
    selector: '[appMainLayoutSizeListener]'
})
export class MainLayoutSizeListenerDirective implements AfterViewInit, OnChanges {
    @Input() size!: number;
    constructor(private el: ElementRef, private mainLayoutContainerService: MainLayoutContainerService) { }
    ngOnChanges(changes: SimpleChanges): void {
        this.mainLayoutContainerService.calculateWidth();
    }

    ngAfterViewInit(): void {
        this.mainLayoutContainerService.widthChanged$.subscribe(() => {
            this.mainLayoutContainerService.updateWidth(this.el.nativeElement.clientWidth);
        });
    }

}
