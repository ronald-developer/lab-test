import { Component, OnInit } from '@angular/core';
import { FinesTestCalculatorService } from '../services/fines-test-calculator.service';

@Component({
	selector: 'app-fines-test-result',
	templateUrl: './fines-test-result.component.html'
})
export class FinesTestResultComponent {

	constructor(private finesTestCalculatorService: FinesTestCalculatorService) {
	}


	public dataSource$ = this.finesTestCalculatorService.calculations$;

}
