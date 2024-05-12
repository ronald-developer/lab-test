import { Component, Input, OnInit } from '@angular/core';
import { ResponseImportResultModel } from 'src/app/common/api-response-models/response-import-result-model';

@Component({
  selector: 'app-upload-result',
  templateUrl: './upload-result.component.html'
})
export class UploadResultComponent implements OnInit {

	@Input() result: ResponseImportResultModel|undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
