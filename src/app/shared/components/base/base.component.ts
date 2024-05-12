import { Component, ViewChild } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { LoadingUiDirective } from '../../directives/loading-ui.directive';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * implements basic component functions ie: loading
 */
@Component({
	selector: 'app-base',
	template: ``
})
export class BaseComponent {
	@ViewChild('appLoadingUi') appLoadingUi?: LoadingUiDirective;
	constructor() { }

	public loading(val: boolean) {
		if (val) {
			this.appLoadingUi?.loading();
		} else {
			this.appLoadingUi?.completed();
		}
	}

	public endLoading() {
		return (source: Observable<any>) => {
			return source.pipe(
				catchError(() => of(null)),
				finalize(() => {
					this.loading(false);
				}))
		}
	}

}

