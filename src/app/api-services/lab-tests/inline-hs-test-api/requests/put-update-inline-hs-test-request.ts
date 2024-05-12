import { RequestInlineHsTestEntry } from "../models/request-inline-hs-test-entry";

export class PutUpdateInlineHsTestRequest {
    constructor(public data: RequestInlineHsTestEntry) {
		data.blendingMoisture = +data.blendingMoisture;
		data.inclineConveyor = +data.inclineConveyor;
		data.cylinderExitMoisture = +data.cylinderExitMoisture;
		data.cylinderExitTemperature = +data.cylinderExitTemperature;
	}
}
