import { Comune } from './comune';

export interface InfoSede {
  id: number;
  via: string;
  civico: string;
  cap: string;
  localita: string;
  comune: Comune;
}
