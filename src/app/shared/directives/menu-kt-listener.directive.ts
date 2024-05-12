import { MainLayoutContainerService } from '../../core/services/main-layout-container.service';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
@Directive({
	selector: '[appMenuKtListener]'
})
export class MenuKtListenerDirective implements AfterViewInit, OnDestroy {
	@Input() parentContainerElement!: HTMLElement;
	private processing = false;
	private observer = new MutationObserver(() => this.setWidth());
	constructor(private el: ElementRef, private renderer: Renderer2, private mainLayoutContainerService: MainLayoutContainerService) { }

	ngAfterViewInit(): void {
		this.setWidth();
		this.registerListenerForDomChanges();
	}

	ngOnDestroy() {
		this.observer.disconnect();
	}

	/** sets width of the popup base on the parent container's width */
	private setWidth() {
		if (!this.processing) {
			this.processing = true;
			let parentContainer: any = this.parentContainerElement;
			if (!this.parentContainerElement) {
				parentContainer = document.querySelector('#kt_app_page');
			}
			this.renderer.setStyle(this.el.nativeElement, 'width', parentContainer.clientWidth + 'px');
			this.processing = false;
		}
	}

	private registerListenerForDomChanges() {
		const attributes = true;
		const childList = true;
		const subtree = true;
		this.observer.observe(this.el.nativeElement, { attributes, childList, subtree });

		this.mainLayoutContainerService.mainLayoutWidth$.subscribe((width) => {
			this.renderer.setStyle(this.el.nativeElement, 'width', width + 'px');
		});
	}

}
