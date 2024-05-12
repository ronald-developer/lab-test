import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { DensityTestCalculatorService } from '../services/density-test-calculator.service';

@Component({
  selector: 'app-density-test-result',
  templateUrl: './density-test-result.component.html'
})
export class DensityTestResultComponent  extends BaseComponent {

  constructor(private densityTestCalculatorService: DensityTestCalculatorService) {
      super();
  }

  public dataSource$ = this.densityTestCalculatorService.calculations$;

}
