import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { Counter } from '../../../models/counter.model';
import { AuthService } from '../auth/auth.service';
import { CounterResponse } from '../../../models/counterResponse.model';

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  api = inject(ApiService)
  auth = inject(AuthService)
  getPath = `counters/records?filter=user_id="${this.auth.user()?.id}"`
  updateAndSingleCounterPath = `counters/records/`
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

  getCounters$(): Observable<void> {
    return this.api.get<CounterResponse>(this.getPath).pipe(
      filter((value) => value.items.length > 0),
      map((value) => {
        const counters: Counter[] = [];
        value.items.forEach(element => {
          counters.push({
            id: element.id,
            counter_value: element.counter_value,
            user_id: element.user_id
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
    return this.api.update<Counter>(`${this.updateAndSingleCounterPath}${counter.id}`, counter)
  }
}
