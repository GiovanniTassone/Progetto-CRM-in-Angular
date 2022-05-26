import { InfoSede } from './info-sede';

export interface Cliente {
  id: number;
  ragioneSociale: string;
  partitaIva: string;
  tipoCliente: string;
  email: string;
  pec: string;
  telefono: string;
  nomeContatto: string;
  cognomeContatto: string;
  telefonoContatto: string;
  emailContatto: string;
  indirizzoSedeOperativa: InfoSede;
  indirizzoSedeLegale: InfoSede;
  dataInserimento: string;
  dataUltimoContatto: string;
  fatturatoAnnuale: number;
}
