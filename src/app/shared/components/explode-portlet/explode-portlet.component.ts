import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ExplodePortletPopupComponent } from './explode-portlet-popup/explode-portlet-popup.component';
import * as kthelpers from '../../../_metronic/kt/components/MenuComponent';

@Component({
	selector: 'app-explode-portlet',
	templateUrl: './explode-portlet.component.html'
})
export class ExplodePortletComponent implements OnInit {
	@Input() set explodePortletContentTemplateRef(val: TemplateRef<any>) {
		this.contentTemplate = val;
	}
	@ViewChild(ExplodePortletPopupComponent, { read: ElementRef }) exploadContainer!: ElementRef;
	@ViewChild('toggler') toggler!: ElementRef;
	@Output() explodeContentShown = new EventEmitter<boolean>();
	contentTemplate!: TemplateRef<any>;
	constructor() { }

	ngOnInit(): void {
	}

	public onExplodeToggleClick() {
		this.explodeContentShown.emit(true);
	}

	public close() {
		this.explodeContentShown.emit(false);
		kthelpers.MenuComponent.getInstance(this.toggler.nativeElement)?.hide(this.exploadContainer.nativeElement);

	}
}
