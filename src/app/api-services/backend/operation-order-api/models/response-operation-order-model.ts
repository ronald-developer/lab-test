import { ResponseOperationOrderByProduct } from "./response-operation-order-by-product-model";

export interface ResponseOperationOrderModel {
	id: number;
	displayNo: string;
	motherGradeId: number;
	motherGradeCode: string;
	byProducts: ResponseOperationOrderByProduct[];
}


