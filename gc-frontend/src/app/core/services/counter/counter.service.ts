import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { Counter } from '../../../models/counter.model';
import { AuthService } from '../auth/auth.service';
import { CounterResponse } from '../../../models/counterResponse.model';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  api = inject(ApiService)
  auth = inject(AuthService)
  getPath = `counters/records?filter=user_id="${this.auth.user()?.id}"`
  updateCreateDeleteCounterPath = `counters/records/`
  counters: WritableSignal<Counter[]> = signal<Counter[]>([])

  // getCounter$(id: string): Observable<Counter> {
  //   return this.api.get<Counter>(`${this.updateAndSingleCounterPath}${id}`).pipe(
  //     map((value) => {
  //       return value;
  //     }),
  //     catchError((error) => {
  //       console.error(`Error getting counter(s): ${error}`)
  //       return of()
  //     })
  //   )
  // }

  constructor() {
    this.loadCounters()
  }

  loadCounters() {
    this.getCounters$().subscribe()
  }

  createCounter$(counter: Counter): Observable<Counter>{
    return this.api.create<Counter>(this.updateCreateDeleteCounterPath, counter)
  }

  getCounters$(): Observable<void> {
    return this.api.get<CounterResponse>(this.getPath).pipe(
      filter((value) => value.items.length > 0),
      map((value) => {
        const counters: Counter[] = [];
        value.items.forEach(element => {
          counters.push({
            id: element.id,
            counter_value: element.counter_value,
            user_id: element.user_id,
            counter_name: element.counter_name
          })
        });
        return this.counters.set(counters);
      }),
      catchError((error) => {
        console.error(`Error getting counter(s): ${error}`)
        return of(this.counters.set([]))
      })
    )
  }

  updateCounter$(counter: Counter): Observable<Counter> {
    return this.api.update<Counter>(`${this.updateCreateDeleteCounterPath}${counter.id}`, counter)
  }

  deleteCounter$(id: string): Observable<HttpResponse<HttpStatusCode>>{
    return this.api.delete<HttpResponse<HttpStatusCode>>(`${this.updateCreateDeleteCounterPath}`, id)
  }
}
