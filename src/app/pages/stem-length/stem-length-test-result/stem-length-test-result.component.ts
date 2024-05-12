import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { StemLengthTestCalculatorService } from '../services/stem-length-test-calculator.service';

@Component({
    selector: 'app-stem-length-test-result',
    templateUrl: './stem-length-test-result.component.html'
})
export class StemLengthTestResultComponent extends BaseComponent implements OnInit {

    constructor(private stemLengthTestCalculatorService: StemLengthTestCalculatorService) {
        super();
    }

    public dataSource$ = this.stemLengthTestCalculatorService.calculations$;
    public averageLength$ = this.stemLengthTestCalculatorService.averageLength$;

    ngOnInit(): void {
    }
}
