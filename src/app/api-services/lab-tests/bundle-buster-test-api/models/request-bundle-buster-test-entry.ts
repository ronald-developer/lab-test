import { PositionType } from "src/app/shared/models/position-type";

export interface RequestBundleBusterTestEntry {
	operationOrderId: number;
	positionType: PositionType;
	entryDate: Date;
	butted: number;
	unButted: number;
}
