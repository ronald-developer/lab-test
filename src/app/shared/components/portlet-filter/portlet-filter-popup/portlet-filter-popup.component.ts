import { Component, Input, TemplateRef, HostBinding } from '@angular/core';

@Component({
    selector: 'app-portlet-filter-popup',
    templateUrl: './portlet-filter-popup.component.html'
})
export class PortletFilterPopupComponent {
    @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold';
    @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
    @HostBinding('attr.data-update-class') classs = 'true';
    @Input() filterCriteriaTemplateRef!: TemplateRef<any>;

}
