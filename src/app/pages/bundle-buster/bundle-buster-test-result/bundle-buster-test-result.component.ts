import { Component } from '@angular/core';
import { BundleBusterTestCalculatorService } from '../services/bundle-buster-test-calculator.service';

@Component({
  selector: 'app-bundle-buster-test-result',
  templateUrl: './bundle-buster-test-result.component.html'
})
export class BundleBusterTestResultComponent {

  constructor(private bundleBusterTestCalculatorService: BundleBusterTestCalculatorService) {
  }

  public dataSource$ = this.bundleBusterTestCalculatorService.calculations$;
}
