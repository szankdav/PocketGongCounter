import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import PocketBase from 'pocketbase';
import { Counter } from '../../../models/counter.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  pb = new PocketBase(environment.pocketbaseUrl);
  baseUrl = environment.baseUrl
  http = inject(HttpClient)

  get<T>(route: string) : Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${route}`);
  }

  update<T>(route: string, data: Counter) {
    return this.http.patch<T>(`${this.baseUrl}/${route}`, data);
  }

  create<T>(route: string, data: Counter) {
    return this.http.post<T>(`${this.baseUrl}/${route}`, data);
  }

  delete<T>(route: string, id: string){
   return this.http.delete<T>(`${this.baseUrl}/${route}${id}`) 
  }
}
