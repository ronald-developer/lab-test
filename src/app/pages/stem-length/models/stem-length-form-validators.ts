import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { StemLengthForm, stemLengthFormControlDescriptor } from "./stem-length-form-descriptor";

type ValidationArgs = { testValue?: number, testRange?: [number, number] }

export { stemLengthInputValidator, ValidationArgs }
function stemLengthInputValidator(controlName: keyof StemLengthForm, args: ValidationArgs): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = /^\d*\.?\d{1}$/g;
        let valid: boolean = true;
        const ctrl = stemLengthFormControlDescriptor.get(controlName);
        let validationMsg = null;
        if (control.value && ctrl?.validationMessage) {
            validationMsg = ctrl.validationMessage(control.value, { ...args });
            valid = regex.test(control.value) && validationMsg == null;
        }

        return valid ? null : { invalidTestInput: validationMsg }
    };
}
