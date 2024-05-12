export interface RequestInlineDataTestEntry {
  operationOrderId: number;
  shiftType: number;
  entryDate: Date;
  blendingMoisture: number;
  firstOrderingMoisture: number;
  secondOrderingMoisture: number;
  tipsOrderingMoisture: number;
  beforeRedryingMoisture: number;
  rightCoolerMoisture: number;
  leftCoolerMoisture: number;
  redryerEndMoisture: number;
  firstOrderingTemp: number;
  secondOderingTemp: number;
  tipsOrderingTemp: number;
  firstRedryingZoneTemp: number;
  secondRedryingZoneTemp: number;
  thirdRedryingZoneTemp: number;
  fourthRedryingZoneTemp: number;
  coolerTemp: number;
  redryerEndTemp: number;
  firstOrderingNIR: number;
  secondOrderingNIR: number;
  tipsOrderingNIR: number;
}
