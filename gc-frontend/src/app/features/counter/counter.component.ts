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

  ngOnInit(): void {
    this.loadCounters();
  }

  increaseCounter(counter: Counter){
    counter.counter_value += 1;
    this.updateCounter(counter);
  }

  decreaseCounter(counter: Counter){
    counter.counter_value -= 1;
    this.updateCounter(counter);
  }

  updateCounter(counter: Counter) {
      this.counterService.updateCounter$(counter).subscribe((res) => {
        if (res != null) {
          this.loadCounters()
        }
      })
  }
}