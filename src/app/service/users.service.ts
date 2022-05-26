import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  URL = environment.pathApi;

  constructor(private http: HttpClient) {}

  getAll(pageNumber: number) {
    return this.http.get<any>(
      `${this.URL}/api/users?page=${pageNumber}&size=16`
    );
  }
}
