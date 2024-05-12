import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-loading-ui',
    templateUrl: './loading-ui.component.html',
    styleUrls: ['./loading-ui.component.scss']
})
export class LoadingUiComponent {

    public blockPage!: boolean;
    public loadingId!: string;
    @HostBinding('class.d-none') hide = false;
    constructor() { }

    public close() {
        this.hide = true;
    }

}
