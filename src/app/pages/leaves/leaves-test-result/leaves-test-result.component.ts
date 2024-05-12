import { Component } from '@angular/core';
import { LeavesTestCalculatorService } from '../services/leaves-test-calculator.service';

@Component({
  selector: 'app-leaves-test-result',
  templateUrl: './leaves-test-result.component.html'
})
export class LeavesTestResultComponent {

  constructor(private leavesTestCalculatorService: LeavesTestCalculatorService) {
  }


  public dataSource$ = this.leavesTestCalculatorService.calculations$;

}
