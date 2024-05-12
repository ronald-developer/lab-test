import { FinesForm } from "./fines-form-descriptor";


export type FinesPercentageResult = Pick<FinesForm, 'over4' | 'over8' | 'over16' | 'over32' | 'pan'>
