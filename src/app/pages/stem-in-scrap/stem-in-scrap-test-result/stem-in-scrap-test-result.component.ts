import { Component } from '@angular/core';
import { StemInScrapTestCalculatorService } from '../services/stem-in-scrap-test-calculator.service';

@Component({
  selector: 'app-stem-in-scrap-test-result',
  templateUrl: './stem-in-scrap-test-result.component.html'
})
export class StemInScrapTestResultComponent {

  constructor(private stemInScrapTestCalculatorService: StemInScrapTestCalculatorService) {
  }

  public dataSource$ = this.stemInScrapTestCalculatorService.calculations$;
}
