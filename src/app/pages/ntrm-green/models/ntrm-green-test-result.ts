import { nonTestProperties } from "src/app/shared/models/non-test-properties";
import { NtrmGreenForm } from "./ntrm-green-form-descriptor";

export type NtrmGreenTestResult = Omit<NtrmGreenForm, typeof nonTestProperties[number]> & {
	category1SyntheticPcsKg: number;
	category1MineralPcsKg: number;
	category2NonSyntheticPcsKg: number;
	category2NaturalPcsKg: number;
	category2OrganicPcsKg: number;
}
