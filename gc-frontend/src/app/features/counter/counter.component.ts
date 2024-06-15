import { ChangeDetectionStrategy, Component, OnInit, Signal, computed, inject } from '@angular/core';
import { CounterService } from '../../core/services/counter/counter.service';
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
  counters: Signal<Counter[]> = computed(() => this.counterService.counters())

  ngOnInit(): void {
    this.loadCounters()
  }
  
  loadCounters(){
    this.counterService.getCounters$().subscribe()
  }

  increaseCounter(counter: Counter) {
    counter.counter_value += 1;
    this.updateCounter(counter);
  }

  decreaseCounter(counter: Counter) {
    counter.counter_value -= 1;
    this.updateCounter(counter);
  }

  updateCounter(counter: Counter) {
    this.counterService.updateCounter$(counter).subscribe((res) => {
      if(res != null){
        this.loadCounters()
      }
    })
  }
}