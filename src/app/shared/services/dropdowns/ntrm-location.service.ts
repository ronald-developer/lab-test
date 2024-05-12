import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { PackingGradeApiService } from "../../../api-services/backend/packing-grade-api/packing-grade-api.service";
import { SelectOption } from "../../models/select-option";
import { NtrmLocationApiService } from "src/app/api-services/setup/ntrm-location-api/ntrm-location-api.service";

@Injectable({
    providedIn: 'root'
})
export class NtrmLocationService {

    constructor(private ntrmLocationApiService: NtrmLocationApiService) { }

    public async getAll() {
        const options = await new Promise<SelectOption[]>((resolve) => {
            this.ntrmLocationApiService.getAll().pipe(
                map(response => response.response.data.map(source => new SelectOption(source.id, source.name)))).subscribe((result) => resolve(result))
        });
        return options;
    }

}
