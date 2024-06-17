import { ChangeDetectionStrategy, Component, OnInit, Signal, computed, inject } from '@angular/core';
import { CounterService } from '../../core/services/counter/counter.service';
import { Counter } from '../../models/counter.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  authService = inject(AuthService)
  counterService = inject(CounterService)
  counters: Signal<Counter[]> = computed(() => this.counterService.counters())
  counter: Counter = {
    id: '',
    counter_value: 0,
    user_id: this.authService.user()!.id,
    counter_name: ''
  };
  counterName: string = '';
  counterValue: number = 0;
  change: boolean = false;

  ngOnInit(): void {
    this.loadCounters()
  }

  loadCounters() {
    this.counterService.getCounters$().subscribe()
  }

  updateCounter(counter: Counter) {
    this.counterService.updateCounter$(counter).subscribe((res) => {
      if (res != null) {
        this.loadCounters()
      }
    })
  }

  deleteCounter(counter: Counter) {
    this.counterService.deleteCounter$(counter.id).subscribe((res) => {
      if (res == null) {
        console.log(res)
        this.loadCounters()
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

  changeCounter(){
    this.counter.counter_name = this.counterName
    this.counter.counter_value = this.counterValue
    this.counterService.updateCounter$(this.counter).subscribe((res) => {
      if (res != null) {
        this.loadCounters()
      }
    })
    this.change = false
    this.counterName = ''
    this.counterValue = 0
  }

  createCounter() {
    this.counter.counter_name = this.counterName
    this.counter.counter_value = this.counterValue
    this.counterService.createCounter$(this.counter).subscribe((res) => {
      if (res != null) {
        this.loadCounters()
      }
    })
  }

  loadCounterToModal(counter: Counter) {
    this.change = true;
    this.counter = counter
    this.counterName = this.counter.counter_name
    this.counterValue = this.counter.counter_value
  }

  resetModalAndCounterId(){
    this.change = false
    this.counterName = ''
    this.counterValue = 0
    this.counter.id = ''
  }
}