import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pb = new PocketBase('http://localhost:8090');
  baseUrl = 'http://localhost:8090/api/collections'

  http = inject(HttpClient)

  getCounters<T>(route: string) {
    return this.http.get(`${this.baseUrl}/${route}`);
  }

  updateCounter<T>(route: string, data: Object) {
    return this.http.patch(`${this.baseUrl}/${route}`, data);
  }
}
