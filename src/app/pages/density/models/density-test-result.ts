import { nonTestProperties } from "src/app/shared/models/non-test-properties";
import { DensityForm } from "./density-form-descriptor";
export type DensityTestProps = Omit<Omit<DensityForm, typeof nonTestProperties[number]>, 'cartonNo' | 'chargerType'>;
export type DensityTestPercentageResult = DensityTestProps & { ave: number, sd: number, cd: number }
