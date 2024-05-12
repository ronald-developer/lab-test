import { nonTestProperties } from "../../../shared/models/non-test-properties";
import { StemLengthForm } from "./stem-length-form-descriptor";
/**
 * Type alias for the stem length test percentage result,
 * in which the properties are defined from the stem length form descriptor excluding the non-test properties
 *
 */
export type StemLengthTestPercentageResult = Omit<StemLengthForm, typeof nonTestProperties[number]> & { between1To4: number }
