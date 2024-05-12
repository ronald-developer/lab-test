import { Component, OnInit } from '@angular/core';
import { NtrmGreenTestCalculatorService } from '../services/ntrm-green-test-calculator.service';

@Component({
	selector: 'app-ntrm-green-test-result',
	templateUrl: './ntrm-green-test-result.component.html'
})
export class NtrmGreenTestResultComponent  {

	constructor(private ntrmGreenTestCalculatorService: NtrmGreenTestCalculatorService) {
	}


	public dataSource$ = this.ntrmGreenTestCalculatorService.calculations$;

}
