
import { nonTestProperties } from "../../../shared/models/non-test-properties";
import { ShortStemForm } from "./short-stem-form-descriptor";
/**
 * Type alias for the short stem test percentage result, in which the properties are defined from the short stem form descriptor excluding the non-test properties
 *
 */
export type ShortStemTestPercentageResult = Omit<ShortStemForm, typeof nonTestProperties[number]> & { totalStem: number }
