import { ChangeDetectorRef, Component } from '@angular/core';
import { ShortStemTestApiService } from 'src/app/api-services/lab-tests/short-stem-test-api/short-stem-test-api.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ShortStemTestCalculatorService } from '../services/short-stem-test-calculator.service';

@Component({
    selector: 'app-short-stem-test-result',
    templateUrl: './short-stem-test-result.component.html'
})
export class ShortStemTestResultComponent extends BaseComponent {

    constructor(private shortStemTestApiService: ShortStemTestApiService, private detector: ChangeDetectorRef,private shortStemTestCalculatorService: ShortStemTestCalculatorService) {
        super();
    }

    public dataSource$ = this.shortStemTestCalculatorService.calculations$;
}
