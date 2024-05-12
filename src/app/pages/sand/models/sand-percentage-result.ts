import { SandForm } from "./sand-form-descriptor";

export type SandPercentageResult = Pick<SandForm, 'twelveMesh' | 'twentyMesh' | 'fourtyMesh'> & { sand: number }
