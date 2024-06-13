import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { Counter } from '../../models/counter.model';
import { AuthService } from '../../core/services/auth/auth.service';
import { CounterResponse } from '../../models/counterResponse.model';

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  api = inject(ApiService)
  auth = inject(AuthService)
  getPath = `counters/records?filter=user_id="${this.auth.user()?.id}"`
  updateAndSingleCounterPath = `counters/records/`

  getCounter$(id: string): Observable<Counter> {
    return this.api.get<Counter>(`${this.updateAndSingleCounterPath}${id}`).pipe(
      map((value) => {
        return value;
      }),
      catchError((error) => {
        console.error(`Error getting counter(s): ${error}`)
        return of()
      })
    )
  }

  getCounters$(): Observable<Counter[]> {
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
        return counters;
      }),
      catchError((error) => {
        console.error(`Error getting counter(s): ${error}`)
        return of([])
      })
    )
  }

  updateCounter$(id: string, data: Object): Observable<Counter> {
    return this.api.update<Counter>(`${this.updateAndSingleCounterPath}${id}`, data)
  }
}
