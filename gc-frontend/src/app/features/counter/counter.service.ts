import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api/api.service';
import { Observable} from 'rxjs';
import { Counter } from '../../models/counter.model';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  api = inject(ApiService)
  auth = inject(AuthService)
  getPath = `counters/records?filter=user_id = "${this.auth.user()?.id}"`
  updatePath = `counters/records/`

  getCounters$(): Observable<any>{
    return this.api.getCounters<Counter[]>(this.getPath)
  }

  updateCounter$(id: string, data: Object): Observable<any>{
    return this.api.updateCounter<HttpResponse<Text>>(`${this.updatePath}${id}`, data)
  }
}
