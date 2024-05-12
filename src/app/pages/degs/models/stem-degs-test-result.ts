import { nonTestProperties } from "src/app/shared/models/non-test-properties";
import { DegsForm } from "./degs-form-descriptor";
import { StemDegsForm } from "./stem-degs-form-descriptor";

/**
 * Type alias for the stem degs test percentage result,
 * in which the properties are defined from the stem degs form descriptor
 *
 */
export type StemDegsTestPercentageResult = Omit<StemDegsForm, 'stemSampleWeight' | 'stemCartonNo'> & { stemSevenTwelveMesh: number, totalStem: number, handstripTotal: number };
