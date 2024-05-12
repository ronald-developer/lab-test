import { PositionType } from "src/app/shared/models/position-type";

export interface ResponseBundleBusterTestModel {
    id: string;
    operationOrderId: number;
    motherGradeId: number;
    positionType: PositionType;
    entryDate: Date;
    butted: number;
    unButted: number;
}
