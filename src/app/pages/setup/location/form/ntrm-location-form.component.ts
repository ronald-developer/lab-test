import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormBuilderHelper } from 'src/app/utils/form-builder-helper.utils';
import { NtrmLocationForm, ntrmLocationFormControlDescriptor } from '../models/ntrm-location-form-descriptor';

@Component({
	selector: 'app-ntrm-location-form',
	templateUrl: './ntrm-location-form.component.html'
})
export class NtrmLocationFormComponent implements OnInit {
	public formGroup!: FormGroup;
	public submittedInvalid: boolean;
	@Input() isEdit!: boolean;

	@Input() set initialData(formData: NtrmLocationForm) {
		if (formData) {
			this.formGroup.patchValue(formData);
		}
	}
	@Input() set reset(done: boolean) {
		if (done) {
			this.formGroup.reset();
		}
	}

	@Output() formChangeEventResult = new EventEmitter<NtrmLocationForm>();

	constructor(private fb: FormBuilder,) {
		this.formGroup = FormBuilderHelper.buildFormFromMapStore<keyof NtrmLocationForm, unknown, unknown>(ntrmLocationFormControlDescriptor, fb);
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
