import { ChangeDetectionStrategy, Component, Signal, computed, inject, signal } from '@angular/core';
import { CounterService } from '../../core/services/counter/counter.service';
import { Counter } from '../../models/counter.model';
import { CounterModalComponent } from '../counter-modal/counter-modal.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    CounterModalComponent
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  counterService = inject(CounterService)
  counters: Signal<Counter[]> = computed(() => this.counterService.counters())
  modalCounter = signal<Counter>({
    id: '',
    counter_value: 0,
    user_id: '',
    counter_name: ''
  })

  updateCounter(counter: Counter) {
    this.counterService.updateCounter$(counter).subscribe((res) => {
      if (res != null) {
        this.counterService.loadCounters()
      }
    })
  }

  deleteCounter(counter: Counter) {
    this.counterService.deleteCounter$(counter.id).subscribe((res) => {
      if (res == null) {
        console.log(res)
        this.counterService.loadCounters()
      }
    })
  }

  increaseCounter(counter: Counter) {
    counter.counter_value += 1;
    this.updateCounter(counter);
  }

  decreaseCounter(counter: Counter) {
    counter.counter_value -= 1;
    this.updateCounter(counter);
  }

  loadCounterToModal(counter: Counter) {
    this.modalCounter.set(counter)
  }
}