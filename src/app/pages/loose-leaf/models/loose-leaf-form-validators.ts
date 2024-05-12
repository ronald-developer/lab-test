import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { LooseLeafForm, looseLeafFormControlDescriptor } from "./loose-leaf-form-descriptor";

// constant value to test against the user inputed value
type LooseLeafValidationArgs = { testRange: [number, number]}

export { looseLeafInputValidator, LooseLeafValidationArgs }
function looseLeafInputValidator(controlName: keyof LooseLeafForm, args: LooseLeafValidationArgs): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    let valid: boolean = true;
    const ctrl = looseLeafFormControlDescriptor.get(controlName);
    let validationMsg = null;
    if (control.value && ctrl?.validationMessage) {
      validationMsg = ctrl.validationMessage(control.value, { ...args });
      valid = validationMsg == null;
    }

    return valid ? null : { invalidTestInput: validationMsg }
  };
}
