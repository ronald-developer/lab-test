import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutType } from '../../../core/configs/config';
import { LayoutInitService } from '../../../core/layout-init.service';
import { LayoutService } from '../../../core/layout.service';
import { NavigationApiService } from './../../../../../api-services/navigation/navigation-api.service';
import { ApplicationType } from './../../../../../common/application-type.enum';
@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent {
    constructor(private router: Router,
        private layout: LayoutService,
        private layoutInit: LayoutInitService,
        private navApiService: NavigationApiService) { }

    applicationType = ApplicationType;
    setBaseLayoutType(layoutType: LayoutType) {
        this.layoutInit.setBaseLayoutType(layoutType);
    }

    setToolbar(toolbarLayout: 'classic' | 'accounting' | 'extended' | 'reports' | 'saas') {
        const currentConfig = { ...this.layout.layoutConfigSubject.value };
        if (currentConfig && currentConfig.app && currentConfig.app.toolbar) {
            currentConfig.app.toolbar.layout = toolbarLayout;
            this.layout.saveBaseConfig(currentConfig)
        }
    }

    public async redirectToSystem(applicationType: ApplicationType) {
        this.navApiService.redirectToSystem(applicationType);
    }
}
