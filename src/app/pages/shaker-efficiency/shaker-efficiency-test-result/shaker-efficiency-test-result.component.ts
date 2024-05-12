import { Component } from '@angular/core';
import { ShakerEfficiencyTestCalculatorService } from '../services/shaker-efficiency-test-calculator.service';

@Component({
  selector: 'app-shaker-efficiency-test-result',
  templateUrl: './shaker-efficiency-test-result.component.html'
})
export class ShakerEfficiencyTestResultComponent {

  constructor(private shakerEfficiencyTestCalculatorService: ShakerEfficiencyTestCalculatorService) {
  }

  public dataSource$ = this.shakerEfficiencyTestCalculatorService.calculations$;

}
