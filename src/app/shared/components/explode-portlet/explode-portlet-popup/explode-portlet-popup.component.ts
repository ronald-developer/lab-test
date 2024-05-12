import { ChangeDetectorRef, Component, HostBinding, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'app-explode-portlet-popup',
	templateUrl: './explode-portlet-popup.component.html'
})
export class ExplodePortletPopupComponent {
	@HostBinding('class') class = 'explode-portlet-popup menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold';
	@HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
	@HostBinding('attr.data-update-class') classs = 'true';

	@Input() explodePortletContentTemplateRef!: TemplateRef<any>;
	constructor(private detector: ChangeDetectorRef) { }


}
