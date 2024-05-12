import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { PackingGradeApiService } from "../../../api-services/backend/packing-grade-api/packing-grade-api.service";
import { SelectOption } from "../../models/select-option";

@Injectable({
    providedIn: 'root'
})
export class PackingGradeService {

    constructor(private packingGradeApiService: PackingGradeApiService) { }

    public async getAll() {
        const options = await new Promise<SelectOption[]>((resolve) => {
            this.packingGradeApiService.getPackingGrades().pipe(
                map(response => response.response.data.map(source => new SelectOption(source.id, source.code)))).subscribe((result) => resolve(result))
        });
        return options;
    }

}
