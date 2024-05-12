import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Fields } from '../../components/portlet-filter/portlet-filter-criteria/models/fields';
import { FieldStore } from '../../components/portlet-filter/portlet-filter-criteria/models/fields-store';

@Injectable()
export class PortletFilterFormBuilderService {
	private form!: FormGroup;
	private defaultFields: Fields[] = Array.from(FieldStore.store.keys());
	private _enabledFormFields: Fields[] = Array.from(FieldStore.store.keys());
	constructor(private fb: FormBuilder) {
	}

	public get enabledFormFields(): Fields[] {
		return this._enabledFormFields;
	}

	/**
	   * builds the form group filter
	   */
	public buildForm(args?: { hideDefaultFields?: Fields[], newFields?: Fields[] }) {
		// incase a test have a new field filter, we add it to the default filters so it will be shown
		if (args?.newFields) {
			this.defaultFields.push(...args?.newFields);
			this._enabledFormFields.push(...args?.newFields);
		}

		const fields = this.defaultFields.reduce((accumulator: { [key: string]: any; }, current) => {
			accumulator[current] = [FieldStore.store.get(current)?.value];
			return accumulator;
		}, {});

		this.form = this.fb.group(fields);

		if (args?.hideDefaultFields) {
			args.hideDefaultFields?.forEach(field => {
				this.form.get(field)?.disable(); // when a field is disabled it will not be shown in portlet filters
				const index = this._enabledFormFields.findIndex(x => x == field);
				this._enabledFormFields.splice(index, 1);
			});
		}

		return this.form;
	}
}
