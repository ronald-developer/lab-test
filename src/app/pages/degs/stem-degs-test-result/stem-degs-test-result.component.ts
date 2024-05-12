import { Component, OnInit } from '@angular/core';
import { StemDegsTestCalculatorService } from '../services/stem-degs-test-calculator.service';

@Component({
	selector: 'app-stem-degs-test-result',
	templateUrl: './stem-degs-test-result.component.html'
})
export class StemDegsTestResultComponent {

	constructor(private stemDegsTestCalculatorService: StemDegsTestCalculatorService) {
	}

	public dataSource$ = this.stemDegsTestCalculatorService.calculations$;

}
