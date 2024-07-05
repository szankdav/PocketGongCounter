import { Observable } from 'rxjs';
import { Counter } from '../../../models/counter.model';  // Adjust the import according to the actual path of the Counter model

export interface IApiService {
  get<T>(route: string): Observable<T>;
  update<T>(route: string, data: Counter): Observable<T>;
  create<T>(route: string, data: Counter): Observable<T>;
  delete<T>(route: string, id: string): Observable<T>;
}
