import { RequestInlineDataTestEntry } from "../models/request-inline-data-test-entry";

export class PostCreateInlineDataTestRequest {
	constructor(public data: RequestInlineDataTestEntry) {
		data.blendingMoisture = +data.blendingMoisture;
		data.firstOrderingMoisture = +data.firstOrderingMoisture;
		data.secondOrderingMoisture = +data.secondOrderingMoisture;
		data.tipsOrderingMoisture = +data.tipsOrderingMoisture;
		data.beforeRedryingMoisture = +data.beforeRedryingMoisture;
		data.rightCoolerMoisture = +data.rightCoolerMoisture;
		data.leftCoolerMoisture = +data.leftCoolerMoisture;
		data.redryerEndMoisture = +data.redryerEndMoisture;
		data.firstOrderingTemp = +data.firstOrderingTemp;
		data.secondOderingTemp = +data.secondOderingTemp;
		data.tipsOrderingTemp = +data.tipsOrderingTemp;
		data.firstRedryingZoneTemp = +data.firstRedryingZoneTemp;
		data.secondRedryingZoneTemp = +data.secondRedryingZoneTemp;
		data.thirdRedryingZoneTemp = +data.thirdRedryingZoneTemp;
		data.fourthRedryingZoneTemp = +data.fourthRedryingZoneTemp;
		data.coolerTemp = +data.coolerTemp;
		data.redryerEndTemp = +data.redryerEndTemp;
		data.firstOrderingNIR = +data.firstOrderingNIR;
		data.secondOrderingNIR = +data.secondOrderingNIR;
		data.tipsOrderingNIR = +data.tipsOrderingNIR;
	}
}


