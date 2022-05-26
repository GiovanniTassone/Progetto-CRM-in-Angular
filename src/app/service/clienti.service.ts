import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClientiService {
  URL = environment.pathApi;

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number) {
    return this.http.get<any>(
      `${this.URL}/api/clienti?page=${pageNumber}&size=12&sort=id,ASC`
    );
  }

  getById(id: number) {
    return this.http.get<any>(`${this.URL}/api/clienti/${id}`);
  }

  createCliente(cliente: Cliente) {
    return this.http.post(`${this.URL}/api/clienti`, cliente);
  }

  deleteCliente(id: number) {
    return this.http.delete(`${this.URL}/api/clienti/${id}`);
  }

  modificaClienti(data: any, id: number) {
    return this.http.put(`${this.URL}/api/clienti/${id}`, data);
  }

  getByRagioneSociale(ragioneSociale: string) {
    return this.http.get<any>(
      `${this.URL}/api/clienti/ragionesociale?nome=${ragioneSociale}`
    );
  }
}
