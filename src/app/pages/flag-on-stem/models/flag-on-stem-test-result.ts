import { nonTestProperties } from "../../../shared/models/non-test-properties";
import { FlagOnStemForm } from "./flag-on-stem-form-descriptor";

export type FlagOnStemPercentageResult = Pick<FlagOnStemForm, 'attachedLamina' | 'freeLamina'> & { totalFlag: number }
