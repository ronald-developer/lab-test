import { AuthService } from '../../modules/auth/services/auth.service';
import { sidebarNavigationStore } from '../../core/components/sidebar-menu-nav/constants/nav-store';
import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
	selector: '[appUiGuard]'
})
export class UiGuardDirective implements OnChanges {
	@Input() route!: string;
	@Input() pageAction!: string;
	@Input() context: 'display' | 'disable' = 'display'; // default-> display (do not show) otherwise (disabled)
	constructor(private el: ElementRef,
		private renderer: Renderer2,
		private authService: AuthService) {
	}

	ngOnChanges() {
		const routeData = sidebarNavigationStore.get(this.route);
		const userRoles = this.authService.getUserRoles();
		if (routeData) {
			let allowed: boolean = false;

			if (this.pageAction) {
				const actions = routeData.pageActions?.find(x => x.name == this.pageAction);
				allowed = actions?.allowedRoles.some(x => userRoles.some(y => y == x)) ?? false;
			} else {
				allowed = routeData.allowedRoles.some(x => userRoles.some(y => y == x));
			}

			this.restrictUi(allowed);
		}
	}

	private restrictUi(allowed: boolean) {
		if (!allowed && this.context === 'display') {
			this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
		} else if (!allowed && this.context === 'disable') {
			this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
		}
	}
}
