import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CounterService } from '../../../core/services/counter/counter.service';
import { Counter } from '../../../models/counter.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-counter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './counter-modal.component.html',
  styleUrl: './counter-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterModalComponent implements OnChanges, OnInit {
  counterService = inject(CounterService)

  @Input() loadedCounter!: Counter;
  change: boolean = false;

  modalForm = new FormGroup({ counterName: new FormControl(), counterValue: new FormControl() })

  get counterNameControl(): FormControl<string> {
    return this.modalForm.controls.counterName
  }

  get counterValueControl(): FormControl<number | null> {
    return this.modalForm.controls.counterValue
  }

  onSubmit() {
    const counterFromModal: Counter = {
      id: this.change ? this.loadedCounter.id : '',
      user_id: this.loadedCounter.user_id,
      counter_name: this.counterNameControl.value,
      counter_value: this.counterValueControl.value!
    }
    if (!this.change) {
      this.counterService.createCounter$(counterFromModal).subscribe((res) => {
        if (res != null) {
          this.counterService.setCounters()
        }
      })
      this.resetModal()
    }
    else {
      this.counterService.updateCounter$(counterFromModal).subscribe((res) => {
        if (res != null) {
          this.counterService.setCounters()
        }
      })
      this.resetModal()
    }
  }

  ngOnInit(): void {
    this.change = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change = true;
    console.log(this.change)
    console.log(this.loadedCounter.id)
    this.modalForm.setControl(
      'counterName',
      new FormControl(this.change == true ? this.loadedCounter.counter_name : '', {
        nonNullable: true,
        validators: [Validators.required]
      })
    )
    this.modalForm.setControl(
      'counterValue',
      new FormControl(this.change == true ? this.loadedCounter.counter_value : 0)
    )
  }

  resetModal() {
    this.change = false
    this.modalForm.setControl(
      'counterName',
      new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    )
    this.modalForm.setControl(
      'counterValue',
      new FormControl(0)
    )
    console.log(this.change)
  }
}
