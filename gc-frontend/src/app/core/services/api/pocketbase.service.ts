import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {
  pb = new PocketBase(environment.pocketbaseUrl);
  
  getInstance(){
    return this.pb;
  }
}
