import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pb = new PocketBase('http://localhost:8090');
  baseUrl = 'http://localhost:8090/api/collections'
  http = inject(HttpClient)

  get<T>(route: string) {
    return this.http.get<T>(`${this.baseUrl}/${route}`);
  }

  update<T>(route: string, data: Object) {
    return this.http.patch<T>(`${this.baseUrl}/${route}`, data);
  }
}
