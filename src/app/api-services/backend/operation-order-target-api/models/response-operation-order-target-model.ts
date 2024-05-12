import { ResponseDryTargetModel } from "./response-dry-target-model";
import { ResponseMoistureTargetModel } from "./response-moisture-target-model";
import { ResponseTemperatureTargetModel } from "./response-temperature-target-model";

export interface ResponseOperationOrderTargetModel {
	id: number;
	operationNo: number;
	operationYear: number;
	customerCode: string;
	moistureTargets: ResponseMoistureTargetModel[];
	temperatureTargets: ResponseTemperatureTargetModel[];
	dryTargets: ResponseDryTargetModel[];

}
