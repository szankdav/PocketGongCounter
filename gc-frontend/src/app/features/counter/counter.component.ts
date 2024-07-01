import { ChangeDetectionStrategy, Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { CounterService } from '../../core/services/counter/counter.service';
import { Counter } from '../../models/counter.model';
import { AuthService } from '../../core/services/auth/auth.service';
import { CounterModalComponent } from './counter-modal/counter-modal.component';

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
export class CounterComponent implements OnInit {
  authService = inject(AuthService)
  counterService = inject(CounterService)
  counters: Signal<Counter[]> = computed(() => this.counterService.counters())
  modalCounter = signal<Counter>({
    id: '',
    counter_value: 0,
    user_id: this.authService.user().id,
    counter_name: ''
  })

  ngOnInit(): void {
    this.counterService.setCounters()
  }

  updateCounter(counter: Counter) {
    this.counterService.updateCounter$(counter).subscribe((res) => {
      if (res != null) {
        this.counterService.setCounters()
      }
    })
  }

  deleteCounter(counter: Counter) {
    this.counterService.deleteCounter$(counter.id).subscribe((res) => {
      if (res == null) {
        console.log(res)
        this.counterService.setCounters()
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