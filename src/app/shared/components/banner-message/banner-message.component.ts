import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ErrorMessagingService, ShowErrorLocationLevel } from './../../../core/services/error-messaging.service';

@Component({
    selector: 'app-banner-message',
    templateUrl: './banner-message.component.html',
    styleUrls: ['banner-message.component.scss']
})
export class BannerMessageComponent {
    @Input() location!: ShowErrorLocationLevel
    constructor(private errorMessagingService: ErrorMessagingService, private router: Router) {
        this.onRouteChanged();
    }
    public errorMessage$ = this.errorMessagingService.messages$;
    public isMessages(message: string[] | string) {
        return Array.isArray(message);
    }
    public close() {
        this.errorMessagingService.clearMessage();
    }

    private onRouteChanged() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.close();
            }
        });
    }
}
