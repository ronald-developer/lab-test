import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { MoistureAndTempTestApiService } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/moisture-and-temp-test-api.service';
import { PostUploadMoistureAndTempTestRequest } from 'src/app/api-services/lab-tests/moisture-and-temp-test-api/requests/post-upload-moisture-and-temp-test-request';
import { ResponseImportResultModel } from 'src/app/common/api-response-models/response-import-result-model';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FileValidatorHelper } from 'src/app/utils/file-validator-helper-utils';

@Component({
	selector: 'app-moisture-and-temp-test-upload',
	templateUrl: './moisture-and-temp-test-upload.component.html'
})
export class MoistureAndTempTestUploadComponent extends BaseComponent implements OnInit {
	public uploadResult: ResponseImportResultModel | undefined;
	form: FormGroup = new FormGroup({
		operationOrderId: new FormControl(null, Validators.required),
		file: new FormControl(null, [Validators.required, FileValidatorHelper.requiredFileSize(5), FileValidatorHelper.requiredFileType('xlsx')])
	});

	constructor(
		private router: ActivatedRoute,
		private moistureAndTempTestApiService: MoistureAndTempTestApiService,
		private toastr: ToastrService) {
		super();
	}

	ngOnInit(): void {

	}

	public get file() {
		return this.form.get('file');
	}

	onFileSelected(event: any) {
		this.form.get('file')?.setValue(event.target.files[0]);
	}

	upload() {
		this.loading(true);
		this.moistureAndTempTestApiService.upload(new PostUploadMoistureAndTempTestRequest(this.file?.value), this.operationOrderId?.value).subscribe(event => {
			if (event.type === HttpEventType.Response) {
				this.toastr.success('File uploaded!', 'Success!');
				this.uploadResult = event?.body?.response.data;
				this.loading(false);
			}
		}, (error) => {
			this.toastr.error('Failed to upload file!', 'Error!');
			this.loading(false);
		});
	}


	public downloadUploadSheet() {
		this.loading(true);
		this.moistureAndTempTestApiService.downloadUploadSheet(this.operationOrderId?.value).subscribe(result => {
			const blob = new Blob([result], { type: 'application/xlsx' });
			saveAs(blob, 'moisture_and_temp_upload_sheet.xlsx');
			this.loading(false);
		}, (error) => {
			this.toastr.error('Failed to download file!', 'Error!');
			this.loading(false);
		});
	}


	public get isOperationOrderDropdownInvalid() {
		const ctrl = this.form.get('operationOrderId') as AbstractControl;
		return ctrl.invalid && ctrl.touched && ctrl.dirty || ctrl.invalid && ctrl.touched;
	};

	public get operationOrderId(){
		return this.form.get('operationOrderId');
	}
}
