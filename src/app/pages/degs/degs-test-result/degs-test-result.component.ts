import { Component } from '@angular/core';
import { DegsTestCalculatorService } from '../services/degs-test-calculator.service';

@Component({
	selector: 'app-degs-test-result',
	templateUrl: './degs-test-result.component.html'
})
export class DegsTestResultComponent {

	constructor(private degsTestCalculatorService: DegsTestCalculatorService) {
	}

	public dataSource$ = this.degsTestCalculatorService.calculations$;

}
