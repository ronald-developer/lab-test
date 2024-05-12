import { nonTestProperties } from "src/app/shared/models/non-test-properties";
import { StemAuditForm } from "./stem-audit-form-descriptor";
export type StemAuditTestProps = Omit<Omit<StemAuditForm, typeof nonTestProperties[number]>, 'containerNo' | 'containerRange' | 'sampleType' | 'shakerId'>;
export type StemAuditTestPercentageResult = StemAuditTestProps & { sampleWeight: number, totalOverMesh:number }
