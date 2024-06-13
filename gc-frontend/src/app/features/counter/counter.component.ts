import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CounterService } from './counter.service';
import { Counter } from '../../models/counter.model';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  counterService = inject(CounterService)
  counters = signal<Counter[]>([])

  loadCounters() {
    this.counterService.getCounters$().subscribe((res) => {
      this.counters.set(res)
    })
  }

  // loadCounter(counter: Counter){
  //   let counters: Counter[] = this.counters()
  //   let indexOfCouterToUpdate: number = counters.findIndex(x => x.id == counter.id)
  //   counters[indexOfCouterToUpdate] = counter
  //   this.counters.set(counters)
  //   // Method 2
  //   const counters: Counter[] = this.counters();
  //   let counter = counters.findIndex(x => x.id == id);
  //   this.counterService.getCounter$(id).subscribe((res) => {
  //     counters[counter] = res;
  //     this.counters.set(counters)
  //   })
  // }

  ngOnInit(): void {
    this.loadCounters();
  }

  updateCounter(id: string, event: Event) {
    const button = (event.target as HTMLButtonElement)
    this.counterService.getCounter$(id).subscribe((res) => {
      let data = {}
      if(button.textContent == "Increase"){
        data = {
          counter_value: res.counter_value + 1
        }
      }
      else if (button.textContent == "Decrease"){
        data = {
          counter_value: res.counter_value - 1
        }
      }
      this.counterService.updateCounter$(id, data).subscribe((res) => {
        if (res != null) {
          this.loadCounters()
        }
      })
    })
  }
}