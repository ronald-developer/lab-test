import { ResponseOperationOrderModel } from "src/app/api-services/backend/operation-order-api/models/response-operation-order-model";

export type OperationOrderData = Omit<ResponseOperationOrderModel, 'id' | 'displayNo'>
