import { AfterViewInit, Component, ContentChildren, ElementRef, OnInit, QueryList, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';

@Component({
	selector: 'app-sidebar-menu',
	templateUrl: './sidebar-menu.component.html',
	styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit, AfterViewInit {
	@ContentChildren('.menu-link') contentChildren!: QueryList<ElementRef>;
	public readonly labTestsNavigationMenu = NavConfig.labTestsNavigationMenu;
	public readonly setupNavigationMenu = NavConfig.setupNavigationMenu;
	public readonly reportsNavigationMenu = NavConfig.reportsNavigationMenu;

	constructor(private router: Router, private renderer: Renderer2) {

		this.router.events.subscribe(async (route) => {
			if (route instanceof NavigationEnd) {
				const parentActive = document.querySelectorAll('.menu-link.active');
				parentActive.forEach(x => this.renderer.removeClass(x, 'active'));
				this.updateSidebarState();
			}
		});
	}

	ngAfterViewInit(): void {
		this.updateSidebarState();
	}

	private updateSidebarState() {
		const urlTree = this.router.parseUrl(location.pathname);
		const segments = urlTree.root.children['primary'].segments;
		const activeAnchor = document.querySelector(`a[href="/${segments.join('/')}"]`);

		this.updateParentChildClassAttr(activeAnchor?.parentElement);
	}

	private updateParentChildClassAttr(element?: HTMLElement | null) {
		if (element?.classList.contains('menu-item')) {
			this.renderer.addClass(element, 'hover');
			this.renderer.addClass(element, 'show');

			this.updateParentChildClassAttr(element?.parentElement);
		}

		if (element?.classList.contains('menu-sub')) {
			this.renderer.addClass(element, 'show');
			this.renderer.addClass(element?.parentElement?.firstChild, 'active'); // menu-sub's parent set to active

			this.updateParentChildClassAttr(element.parentElement);
		}
	}

	ngOnInit(): void {
	}

}
