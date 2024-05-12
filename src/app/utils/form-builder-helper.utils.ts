import { FormBuilder, FormGroup } from "@angular/forms";
import { FormControlValueDescriptor } from "../shared/models/form-control-value-descriptor";

export class FormBuilderHelper {
    /**
     * Builds the form from the map store
     * @param store - form's definition
     * @param fb - formbuilder
     * @returns formGroup
     */
    public static buildFormFromMapStore<T, TSource, TStatic>(store: Map<T, FormControlValueDescriptor<TSource, TStatic>>, fb: FormBuilder): FormGroup {
        return formBuilder(store, fb);
    }
}

function formBuilder<T, TSource, TStatic>(store: Map<T, FormControlValueDescriptor<TSource, TStatic>>, fb: FormBuilder) {
    let fields: { [key: string]: unknown } = {};
    const keys = store.keys();
    for (let e of keys) {
        const value = store.get(e)
        let k: string = e as unknown as string;
        fields[k] = [value?.value, value?.validators];
    }
    return fb.group(fields);
}
