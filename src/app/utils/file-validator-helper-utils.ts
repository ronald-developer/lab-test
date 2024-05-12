import { AbstractControl, ValidatorFn } from "@angular/forms";
export class FileValidatorHelper {
	public static requiredFileType(type: string) {
		return requiredFileType(type);
	}
	public static requiredFileSize(sizeMB: number) {
		return requiredFileSize(sizeMB);
	}
}

function requiredFileType(type: string) :ValidatorFn {
	return function (control: AbstractControl) {
		const file = control.value;
		if (file) {
			let extension = file.name.split('.')[1];
			if (type && extension) {
				if (type.toLowerCase() !== extension.toLowerCase()) {
					return {
						requiredFileType: true
					};
				}
				return null;
			}
			return null;
		}

		return null;
	};
}

function requiredFileSize(sizeMB: number):ValidatorFn {
	return function (control: AbstractControl) {
		const file = control.value;
		if (file) {
			const sizeByte = file.size;
			const maxSizeInByte = sizeMB * 1024 * 2014;
			if (sizeByte > maxSizeInByte) {
				return {
					requiredFileSize: true
				}
			}
			return null;
		}

		return null;
	}
}

