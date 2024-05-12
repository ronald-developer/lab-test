import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SandTestApiService } from 'src/app/api-services/lab-tests/sand-test-api/sand-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SandTestCalculatorService } from '../services/sand-test-calculator.service';

@Component({
	selector: 'app-sand-test-result',
	templateUrl: './sand-test-result.component.html'
})
export class SandTestResultComponent extends BaseComponent {

	constructor(private sandTestApiService: SandTestApiService, private detector: ChangeDetectorRef, private sandTestCalculatorService: SandTestCalculatorService) {
		super();
	}

	public dataSource$ = this.sandTestCalculatorService.calculations$;

}
