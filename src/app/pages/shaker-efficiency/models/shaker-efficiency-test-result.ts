import { nonTestProperties } from "src/app/shared/models/non-test-properties";
import { ShakerEfficiencyForm } from "./shaker-efficiency-form-descriptor";

export type ShakerEfficiencyTestProps = Omit<ShakerEfficiencyForm, typeof nonTestProperties[number]>;
export type ShakerEfficiencyTestPercentageResult = ShakerEfficiencyTestProps;
