import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarningDialogComponent } from './warning-dialog.component';

@Injectable({ providedIn: 'root' })
export class WarningDialogService {

	constructor(private modalService: NgbModal) {
	}

	showWarningDialog(title: string, message: string): void {
		const modalRef = this.modalService.open(WarningDialogComponent, { size: 'md', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as WarningDialogComponent;
		instance.title = title;
		instance.dialogMessage = message;
	}
}
