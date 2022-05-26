import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FattureService {
  URL = environment.pathApi;

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number) {
    return this.http.get<any>(
      `${this.URL}/api/fatture?page=${pageNumber}&size=20&sort=id,ASC`
    );
  }

  getFatturaByCliente(id: number) {
    return this.http.get<any>(`${this.URL}/api/fatture/${id}`);
  }

  getFattureByCliente(id: number) {
    return this.http.get<any>(
      `${this.URL}/api/fatture/cliente/${id}?page=0&size=200&sort=id,ASC`
    );
  }

  changeStatus(data: any) {
    return this.http.put<any>(`${this.URL}/api/fatture/${data.id}`, data);
  }

  onDelete(data: any) {
    return this.http.delete<any>(`${this.URL}/api/fatture/${data}`);
  }

  creaFattura(data: any) {
    return this.http.post<any>(`${this.URL}/api/fatture`, data);
  }
}
