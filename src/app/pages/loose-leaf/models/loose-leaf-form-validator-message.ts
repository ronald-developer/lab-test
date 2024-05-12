import { LooseLeafValidationArgs } from "./loose-leaf-form-validators";

export { overOneInch, overHalfInch, overOneFourthInch, overOneEigthInch }
function overOneInch(val: number, args: LooseLeafValidationArgs) {
  if (val <= 0) {
    return 'Input value cannot be zero or lower than zero';
  }
  const testValue = args.testRange[0] == args.testRange[1] ? args.testRange[0] : args.testRange[1];
  return val <= testValue ? 'Input value should be over 1 inches' : null;
}

function overHalfInch(val: number, args: LooseLeafValidationArgs) {
  if (val <= 0) {
    return 'Input value cannot be zero or lower than zero';
  }
  return !testInput(val, args) ? 'Input value should be over 1/2 inches and is less than 1 inches' : null;
}

function overOneFourthInch(val: number, args: LooseLeafValidationArgs) {
  if (val <= 0) {
    return 'Input value cannot be zero or lower than zero';
  }

  return !testInput(val, args) ? 'Input value should be over 1/4 inches and is less than 1/2 inches' : null;
}

function overOneEigthInch(val: number, args: LooseLeafValidationArgs) {
  if (val <= 0) {
    return 'Input value cannot be zero or lower than zero';
  }

  return !testInput(val, args) ? 'Input value should be over 1/8 inches and is less than 1/4 inches' : null;
}

function testInput(val: number, args: LooseLeafValidationArgs) {
  const test1 = val > args.testRange[0];
  const test2 = val < args.testRange[1];
  const result = test1 && test2;
  return result;
}
