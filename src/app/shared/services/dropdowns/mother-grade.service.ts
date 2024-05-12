import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { MotherGradeApiService } from "../../../api-services/backend/mother-grade-api/mother-grade-api.service";
import { SelectOption } from "../../models/select-option";

@Injectable({
    providedIn: 'root'
})
export class MotherGradeService {

    constructor(private motherGradeApiService: MotherGradeApiService) { }

    public async getAll() {
        const options = await new Promise<SelectOption[]>((resolve, reject) => {
            this.motherGradeApiService.getMotherGrades().pipe(
                map((response) => response.response.data.map(source => new SelectOption(source.id, source.code)))).subscribe((result) => resolve(result))
        });
        return options;
    }
}
