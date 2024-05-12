import { Component } from '@angular/core';
import { TipsTestCalculatorService } from '../services/tips-test-calculator.service';

@Component({
  selector: 'app-tips-test-result',
  templateUrl: './tips-test-result.component.html'
})
export class TipsTestResultComponent {

  constructor(private tipsTestCalculatorService: TipsTestCalculatorService) {
  }


  public dataSource$ = this.tipsTestCalculatorService.calculations$;

}
