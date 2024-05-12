import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

type DialogBtnConfiguration = {
	showDeclineBtn: boolean;
	btnLabels: { ok: string, no: string }
}

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent implements OnInit {
	protected clientConfirmAction: () => void;
	protected clientDeclineAction: () => void;
	public dialogMessage: string = "Are you sure you want to perform this action?"
	public dialogBtnConfiguration: DialogBtnConfiguration = { showDeclineBtn: true, btnLabels: { ok: 'Yes', no: 'No' } };

	constructor(private activeModal: NgbActiveModal) {
	}

	ngOnInit(): void {
	}

	public close() {
		this.activeModal.close();
	}

	protected onDecline() {
		if (this.clientDeclineAction) {
			this.clientDeclineAction();
		} else {
			this.close();
		}
	}

	protected onConfirm() {
		if (this.clientConfirmAction) {
			this.clientConfirmAction();
		} else {
			this.close();
		}
	}

	public confirmAction(callback: () => void) {
		this.clientConfirmAction = callback;
	}

	public declineAction(callback: () => void) {
		this.clientDeclineAction = callback;
	}
}
