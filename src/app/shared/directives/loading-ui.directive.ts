import { ChangeDetectorRef, ComponentRef, Directive, ElementRef, Input, OnChanges, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { LoadingUiComponent } from '../components/loading-ui/loading-ui.component';

@Directive({
    selector: '[appLoadingUi]',
    exportAs: 'appLoadingUi'
})
export class LoadingUiDirective {

    public id!: string;

    // should the container blocked with overlay
    @Input() blockPage!: boolean;
    private componentRef: ComponentRef<LoadingUiComponent> | null;

    constructor(private el: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2) {
        this.id = this.generateId();
        const parent = this.renderer.parentNode(this.el.nativeElement);
        this.renderer.setStyle(parent, 'position', 'relative');
    }

    public loading() {
        this.viewContainerRef.clear();
        this.componentRef = null;
        this.componentRef = this.viewContainerRef.createComponent(LoadingUiComponent);
        this.componentRef.instance.blockPage = this.blockPage;
        this.componentRef.instance.loadingId = this.id;
    }

    public completed() {
        this.viewContainerRef.clear();
        this.componentRef = null;
    }

    private generateId() {
        return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    }

}
