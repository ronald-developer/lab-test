import { Injectable } from "@angular/core";
import { finalize, map, shareReplay, tap } from "rxjs";
import { OperationOrderApiService } from "../../../api-services/backend/operation-order-api/operation-order-api.service";
import { SelectOption } from "../../models/select-option";

@Injectable({
	providedIn: 'root'
})
export class OperationOrderService {
	constructor(private operationOrderApiService: OperationOrderApiService) { }

	public async getAll() {
		const options = await new Promise<SelectOption[]>((resolve) => {
			this.operationOrderApiService.getOperationOrders().pipe(
				map((response) => response.response.data.map(source => new SelectOption(source.id, source.displayNo)))).subscribe((result) => resolve(result))
		});
		return options;
	}
}
