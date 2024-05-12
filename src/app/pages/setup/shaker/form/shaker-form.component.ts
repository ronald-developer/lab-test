import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { ShakerForm, ShakerFormControlDescriptor } from '../models/shaker-form-descriptor';

@Component({
	selector: 'app-shaker-form',
	templateUrl: './shaker-form.component.html'
})
export class ShakerFormComponent implements OnInit {
	public formGroup!: FormGroup;
	public submittedInvalid: boolean;
	@Input() isEdit!: boolean;

	@Input() set initialData(formData: ShakerForm) {
		if (formData) {
			this.formGroup.patchValue(formData);
		}
	}
	@Input() set reset(done: boolean) {
		if (done) {
			this.formGroup.reset();
		}
	}

	@Output() formChangeEventResult = new EventEmitter<ShakerForm>();

	constructor(private fb: FormBuilder,) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof ShakerForm, unknown, unknown>(ShakerFormControlDescriptor, fb);
	}

	ngOnInit(): void {
	}

	public save() {
		this.submittedInvalid = this.formGroup.invalid;
		if (this.formGroup.valid) {
			this.formChangeEventResult.emit(this.formGroup.value);
		}
		this.formGroup.markAllAsTouched();
	}

}
