import { Component } from '@angular/core';
import { FlagOnStemTestCalculatorService } from '../services/flag-on-stem-test-calculator.service';

@Component({
  selector: 'app-flag-on-stem-test-result',
  templateUrl: './flag-on-stem-test-result.component.html'
})
export class FlagOnStemTestResultComponent {

  constructor(private flagOnStemTestCalculatorService: FlagOnStemTestCalculatorService) {
  }


  public dataSource$ = this.flagOnStemTestCalculatorService.calculations$;

}
