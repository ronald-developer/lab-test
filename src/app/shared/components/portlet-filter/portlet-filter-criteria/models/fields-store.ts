import { Fields } from "./fields";
type Descriptor = { value: any, hidden?: boolean };
/**
 * default form filters (most common filters for all tests, dont add more here)
 */
export const formControlDescriptor = new Map<Fields, Descriptor>([
    [Fields.OperationNo, { value: null }],
    [Fields.MotherGrade, { value: null }],
    [Fields.FromDate, { value: null }],
    [Fields.PackingGrade, { value: null }],
    [Fields.ShiftType, { value: null }],
    [Fields.FilterByOperationNo, { value: true }],
    [Fields.FilterByDate, { value: false }],
	[Fields.IsNonCompliant, { value: null }],

]);

/**
 * Search criteria form fields default values store
 */
export class FieldStore {
    public static get store() {
        return formControlDescriptor;
    }
}
