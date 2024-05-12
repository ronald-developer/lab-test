import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { ShakerApiService } from "src/app/api-services/setup/shaker-api/shaker-api.service";
import { SelectOption } from "../../models/select-option";

@Injectable({
    providedIn: 'root'
})
export class ShakerService {

    constructor(private shakerApiService: ShakerApiService) { }

    public async getAll() {
        const options = await new Promise<SelectOption[]>((resolve) => {
            this.shakerApiService.getAll().pipe(
                map(response => response.response.data.map(source => new SelectOption(source.id, source.name)))).subscribe((result) => resolve(result))
        });
        return options;
    }

}
