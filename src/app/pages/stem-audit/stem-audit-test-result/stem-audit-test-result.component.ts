import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base/base.component';
import { StemAuditTestCalculatorService } from '../services/stem-audit-test-calculator.service';

@Component({
  selector: 'app-stem-audit-test-result',
  templateUrl: './stem-audit-test-result.component.html'
})
export class StemAuditTestResultComponent  extends BaseComponent {

  constructor(private stemAuditTestCalculatorService: StemAuditTestCalculatorService) {
      super();
  }

  public dataSource$ = this.stemAuditTestCalculatorService.calculations$;

}
