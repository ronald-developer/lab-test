import { Validators } from "@angular/forms";

/**
 * @value formcontrol value
 * @validationMessage - TUserInputValueType user input value, TValidationMsgArgs constant value to test against the user inputed value
 * @validators formcontrol validators
 */
export type FormControlValueDescriptor<TUserInputValueType, TValidationMsgArgs> = {
    value: any,
    validators?: Validators[],
    validationMessage?: (inputValue: TUserInputValueType, args: TValidationMsgArgs) => string | null
};
