import { Injectable } from "@angular/core";
import { SelectOption } from "../../models/select-option";
import { ShiftType } from "../../models/shift-type";
import { TestType } from "../../models/test-type";

@Injectable({
    providedIn: 'root'
})
export class TestTypeService {
    public getAll(): SelectOption[] {
        const result = [];
        result.push(new SelectOption(TestType.Green, 'Green'));
        result.push(new SelectOption(TestType.Dry, 'Dry'));
        return result;
    }
}
