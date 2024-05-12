
import { ValidationArgs } from "./stem-length-form-validators";

export { lessThanPoint5, betweenPoint5And1, between1And1Point5, between1Point5And2, between2And2Point5, between2Point5And3, between3And3Point5, between3Point5And4, moreThan4 }
function lessThanPoint5(val: number, args: ValidationArgs) {
    const value = args.testValue as number;
    if (val <= 0) {
        return 'Input value cannot be zero or lower than zero';
    }
    return val > value ? 'Input value cannot be more than 0.5' : null;
}

function betweenPoint5And1(val: number, args: ValidationArgs) {
    const value = args.testRange as [number, number];
    if (val < 0) {
        return 'Input value cannot be a negative number';
    }
    if (val >= value[0] && val <= value[1]) {
        return null;
    }
    return 'Input value must be between 0.5 to 1';
}

function between1And1Point5(val: number, args: ValidationArgs) {
    const value = args.testRange as [number, number];
    if (val < 0) {
        return 'Input value cannot be a negative number';
    }
    if (val >= value[0] && val <= value[1]) {
        return null;
    }
    return 'Input value must be between 1 to 1.5';
}

function between1Point5And2(val: number, args: ValidationArgs) {
    const value = args.testRange as [number, number];
    if (val < 0) {
        return 'Input value cannot be a negative number';
    }
    if (val >= value[0] && val <= value[1]) {
        return null;
    }
    return 'Input value must be between 1.5 to 2';
}

function between2And2Point5(val: number, args: ValidationArgs) {
    const value = args.testRange as [number, number];
    if (val < 0) {
        return 'Input value cannot be a negative number';
    }
    if (val >= value[0] && val <= value[1]) {
        return null;
    }
    return 'Input value must be between 2 to 2.5';
}

function between2Point5And3(val: number, args: ValidationArgs) {
    const value = args.testRange as [number, number];
    if (val < 0) {
        return 'Input value cannot be a negative number';
    }
    if (val >= value[0] && val <= value[1]) {
        return null;
    }
    return 'Input value must be between 2.5 to 3';
}

function between3And3Point5(val: number, args: ValidationArgs) {
    const value = args.testRange as [number, number];
    if (val < 0) {
        return 'Input value cannot be a negative number';
    }
    if (val >= value[0] && val <= value[1]) {
        return null;
    }
    return 'Input value must be between 3 to 3.5';
}

function between3Point5And4(val: number, args: ValidationArgs) {
    const value = args.testRange as [number, number];
    if (val < 0) {
        return 'Input value cannot be a negative number';
    }
    if (val >= value[0] && val <= value[1]) {
        return null;
    }
    return 'Input value must be between 3.5 to 4';
}

function moreThan4(val: number, args: ValidationArgs) {
    const value = args.testValue as number;
    if (val < 0) {
        return 'Input value cannot be a negative number';
    }
    if (val > value) {
        return null;
    }
    return 'Input value must be greater than 4';
}



