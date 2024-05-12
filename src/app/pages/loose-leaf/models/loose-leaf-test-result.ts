import { nonTestProperties } from "../../../shared/models/non-test-properties"
import { LooseLeafForm } from "./loose-leaf-form-descriptor"

export type LooseLeafPercentageResult = Omit<LooseLeafForm, typeof nonTestProperties[number] | 'sampleWeight'> & { overOneHalfPlusOneFourth: number }
