import { Component } from '@angular/core';
import { LooseLeafTestCalculatorService } from '../services/loose-leaf-test-calculator.service';

@Component({
  selector: 'app-loose-leaf-test-result',
  templateUrl: './loose-leaf-test-result.component.html'
})
export class LooseLeafTestResultComponent {

  constructor(private looseLeafTestCalculatorService: LooseLeafTestCalculatorService) {
  }


  public dataSource$ = this.looseLeafTestCalculatorService.calculations$;

}
