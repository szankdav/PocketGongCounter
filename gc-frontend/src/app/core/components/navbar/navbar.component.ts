import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CounterService } from '../../services/counter/counter.service';
import { Counter } from '../../../models/counter.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  auth = inject(AuthService)
  counterService = inject(CounterService)

  counters: Signal<Counter[]> = computed(() => this.counterService.counters())
  counterValuesSum: Signal<number> = computed(() => this.counters().reduce((sum, counter) => sum + counter.counter_value, 0))

  isLoggedIn: Signal<boolean> = computed(() => {
    return this.auth.user() !== null;
  })

  userEmail: Signal<null | string> = computed(() => {
    const user = this.auth.user();
    return user?.email ?? null;
  })

  logout() {
    this.auth.logout()
    console.log(this.auth.user())
  }
}
