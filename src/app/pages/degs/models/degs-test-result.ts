import { nonTestProperties } from "src/app/shared/models/non-test-properties";
import { DegsForm } from "./degs-form-descriptor";

/**
 * Type alias for the degs test percentage result,
 * in which the properties are defined from the degs form descriptor excluding the non-test properties
 *
 */
export type DegsTestPercentageResult = Omit<DegsForm, typeof nonTestProperties[number]> & { totalOverHalf: number, totalOverQuarter: number, thruQuarter: number };
