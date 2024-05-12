import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-barcode-scanner',
	template: '<ng-content></ng-content>'
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
	@Output() barcodeScanned: EventEmitter<string> = new EventEmitter();

	ngOnInit() {
		document.addEventListener('keypress', this.keyup)
		if (this.timeoutHandler) {
			clearTimeout(this.timeoutHandler)
		}
		this.timeoutHandler = setTimeout(() => {
			this.inputString = ''
		}, 30)
	}

	ngOnDestroy() {
		document.removeEventListener('keypress', this.keyup)
	}

	timeoutHandler: any;

	inputString = ''

	keyup = (e: any) => {
		if (this.timeoutHandler) {
			clearTimeout(this.timeoutHandler);
			this.inputString += String.fromCharCode(e.keyCode);
		}

		this.timeoutHandler = setTimeout(() => {
			if (this.inputString.length <= 3) {
				this.inputString = '';
				return;
			}

			this.barcodeScanned.emit(this.inputString.trim());

			this.inputString = ''
		}, 30)
	}
}
