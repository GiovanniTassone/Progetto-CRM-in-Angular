export interface User {
  accessToken: string;
  nome: string;
  cognome: string;
  email: string;
  id: number;
  roles: [{ id: number; roleName: string }];
  tokenType: string;
  username: string;
}
