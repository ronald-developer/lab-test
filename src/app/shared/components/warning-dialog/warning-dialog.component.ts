import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-warning-dialog',
	templateUrl: './warning-dialog.component.html'
})
export class WarningDialogComponent implements OnInit {
	public title: string;
	public dialogMessage: string = "Warning"

	constructor(private activeModal: NgbActiveModal) {
	}

	ngOnInit(): void {
	}

	public close() {
		this.activeModal.close();
	}
}
