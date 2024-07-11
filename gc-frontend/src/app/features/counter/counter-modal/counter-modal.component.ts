import { ChangeDetectionStrategy, Component, Input, OnChanges, Signal, SimpleChanges, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CounterService } from '../../../core/services/counter/counter.service';
import { Counter } from '../../../models/counter.model';


@Component({
  selector: 'app-counter-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './counter-modal.component.html',
  styleUrl: './counter-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterModalComponent implements OnChanges {

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
        this.counterService.setCounters()
      }
    })
    this.counterName = ''
    this.counterValue = 0
    this.resetModalAndCounterId()
  }

  createCounter() {
    this.loadedCounter.counter_name = this.counterName
    this.loadedCounter.counter_value = this.counterValue
    this.counterService.createCounter$(this.loadedCounter).subscribe((res) => {
      if (res != null) {
        this.counterService.setCounters()
      }
    })
    this.resetModalAndCounterId()
  }

  resetModalAndCounterId() {
    this.change = false
    this.counterName = ''
    this.counterValue = 0
    this.loadedCounter.id = ''
  }
}
