import { Component } from '@angular/core';
import { ButtedLooseLeafTestCalculatorService } from '../services/butted-loose-leaf-test-calculator.service';

@Component({
  selector: 'app-butted-loose-leaf-test-result',
  templateUrl: './butted-loose-leaf-test-result.component.html'
})
export class ButtedLooseLeafTestResultComponent {

  constructor(private buttedLooseLeafTestCalculatorService: ButtedLooseLeafTestCalculatorService) { }

  public dataSource$ = this.buttedLooseLeafTestCalculatorService.calculations$;
}
