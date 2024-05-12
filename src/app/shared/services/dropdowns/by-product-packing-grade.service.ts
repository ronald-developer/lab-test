import { Injectable } from "@angular/core";
import { BehaviorSubject, map, take } from "rxjs";
import { ResponseOperationOrderByProduct } from "src/app/api-services/backend/operation-order-api/models/response-operation-order-by-product-model";
import { OperationOrderApiService } from "../../../api-services/backend/operation-order-api/operation-order-api.service";

@Injectable({
	providedIn: 'root'
})
export class ByProductPackingGradeService {
	constructor(private operationOrderApiService: OperationOrderApiService) {
	}

	private byProducts = new BehaviorSubject<ResponseOperationOrderByProduct[]>([]);
	public byProducts$ = this.byProducts.asObservable();
	public async getByProducts(operationOrderId: number) {
		const options = await new Promise<ResponseOperationOrderByProduct[]>((resolve) => {
			this.operationOrderApiService.getOperationOrders().pipe(
				map((response) => {
					const operationOrder = response.response.data.find(item => item.id == operationOrderId);
					if (operationOrder) {
						this.byProducts.next(operationOrder.byProducts);
						return operationOrder.byProducts;
					}
					return [];
				}
				), take(1)).subscribe((result) => resolve(result))
		});
		return options;
	}

}
