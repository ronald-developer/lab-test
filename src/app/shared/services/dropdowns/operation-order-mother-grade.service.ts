import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { OperationOrderApiService } from "../../../api-services/backend/operation-order-api/operation-order-api.service";
import { OperationOrderData } from "../../components/form-fields/operation-order-mothergrade-dropdown/models/operation-order-mothergrade-data";
import { SelectOptionData } from "../../models/select-option-data";
import { SelectOption } from "../../models/select-option";

@Injectable({
	providedIn: 'root'
})
export class OperationOrderMotherGradeService {
	constructor(private operationOrderApiService: OperationOrderApiService) { }

	public async getAll() {
		const options = await new Promise<SelectOptionData<OperationOrderData>[]>((resolve) => {
			this.operationOrderApiService.getOperationOrders().pipe(
				map((response) => response.response.data.map(source => {
					const selectOptionData: SelectOptionData<OperationOrderData> = {
						...new SelectOption(source.id, source.displayNo), data: { ...source }
					}
					return selectOptionData;
				}))).subscribe((result) => resolve(result))
		});
		return options;
	}
}
