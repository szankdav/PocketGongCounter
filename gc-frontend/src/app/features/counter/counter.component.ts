import { Component, OnInit, inject, signal } from '@angular/core';
import { CounterService } from './counter.service';
import { Counter } from '../../models/counter.model';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnInit {

  ngOnInit(): void {
    this.loadCounters()
  }

  counterService = inject(CounterService)

  counters = signal<Counter[]>([])
  
  initCounters(counters: Counter[]): Counter[] {
    let countersFromDatabase: Counter[] = []
    counters.forEach((c) => {
      const counter = {
        id: c['id'],
        value_1: c['value_1'],
        value_2: c["value_2"],
        user_id: c['user_id']
      }
      countersFromDatabase.push(counter)
    })
    return countersFromDatabase
  }
  
  loadCounters() {
    try {
      this.counterService.getCounters$().subscribe((res) => {
        this.counters.set(this.initCounters(res['items']))
      })
    } catch (error) {
      console.error(error)
    }
  }


  increaseCounter(id: string, counterNumber: number, valueName: string) {
    let increasedNumber: number = counterNumber + 1
    this.changeCounter(increasedNumber, id, valueName)
  }

  decreaseCounter(id: string, counterNumber: number, valueName: string) {
    let increasedNumber: number = counterNumber - 1
    this.changeCounter(increasedNumber, id, valueName)
  }

  changeCounter(increasedNumber: number, id: string, valueName: string){
    try {
      let data = {
        [valueName]: increasedNumber
      }
      this.counterService.updateCounter$(id, data).subscribe((res) => {
        if(res['status'] === undefined){
          this.loadCounters()
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}