/**
 * Search field criteria identifier(form controls key)
 * Update this enum incase of new form field
 */
export enum Fields {
	OperationNo = 'operationOrderId',
	MotherGrade = 'motherGradeId',
	PackingGrade = 'packingGradeId',
	ShiftType = 'shiftType',
	FromDate = 'fromDate',
	FromTime = 'fromTime',
	FilterByOperationNo = 'filterByOperationNo',
	FilterByDate = 'dateSearch',
	ChargerType = 'chargerType',
	CartonNo = 'cartonNo',
	ScreenType = 'screenType',
	TestType = 'testType',
	IsNonCompliant = 'includeOnlyNonCompliant',
	ProductType = 'productTypeId',
	PageSize = 'pageSize',
	PackingGradeByProduct = 'byProductPackingGradeId',
	ProductTypeByProduct = 'byProductProductTypeId',
	PositionType = 'positionType',
	ContainerNo = 'containerNo',
	SampleType = 'sampleType'
}
