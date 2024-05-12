import { Component } from '@angular/core';
import { StemDiameterTestCalculatorService } from '../services/stem-diameter-test-calculator.service';

@Component({
  selector: 'app-stem-diameter-test-result',
  templateUrl: './stem-diameter-test-result.component.html'
})
export class StemDiameterTestResultComponent {

  constructor(private stemDiameterTestCalculatorService: StemDiameterTestCalculatorService) {}

  public dataSource$ = this.stemDiameterTestCalculatorService.calculations$;
}
