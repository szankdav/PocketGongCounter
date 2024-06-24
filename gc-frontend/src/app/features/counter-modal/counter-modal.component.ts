import { Component, Input, OnChanges, Signal, SimpleChanges, WritableSignal, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Counter } from '../../models/counter.model';
import { FormsModule } from '@angular/forms';
import { CounterService } from '../../core/services/counter/counter.service';

@Component({
  selector: 'app-counter-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './counter-modal.component.html',
  styleUrl: './counter-modal.component.css'
})
export class CounterModalComponent implements OnChanges {
  authService = inject(AuthService)
  counterService = inject(CounterService)

  @Input() loadedCounter!: Counter;

  counterName: string = '';
  counterValue: number = 0;
  change: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    this.counterName = this.loadedCounter.counter_name
    this.counterValue = this.loadedCounter.counter_value
    this.change = true
  }

  changeCounter() {
    this.loadedCounter.counter_name = this.counterName
    this.loadedCounter.counter_value = this.counterValue
    this.counterService.updateCounter$(this.loadedCounter).subscribe((res) => {
      if (res != null) {
        this.counterService.loadCounters()
      }
    })
    this.counterName = ''
    this.counterValue = 0
  }

  createCounter() {
    this.loadedCounter.counter_name = this.counterName
    this.loadedCounter.counter_value = this.counterValue
    this.counterService.createCounter$(this.loadedCounter).subscribe((res) => {
      if (res != null) {
        this.counterService.loadCounters()
      }
    })
  }

  resetModalAndCounterId() {
    this.change = false
    this.counterName = ''
    this.counterValue = 0
    this.loadedCounter.id = ''
  }
}
