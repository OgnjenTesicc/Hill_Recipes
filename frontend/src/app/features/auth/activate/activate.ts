import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../core/services/auth';
import { errorMessage } from '../error-message';

type ActivationState = 'loading' | 'success' | 'error';

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  selector: 'app-activate',
  styleUrls: ['../auth-layout.css', './activate.css'],
  templateUrl: './activate.html',
})
export class Activate implements OnInit {
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);

  readonly state = signal<ActivationState>('loading');
  readonly message = signal('');

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.fail('Link za aktivaciju nije ispravan.');
      return;
    }

    this.auth.activate(token).subscribe({
      next: () => this.state.set('success'),
      error: error =>
        this.fail(errorMessage(error, 'Link za aktivaciju nije ispravan ili je istekao.'))
    });
  }

  private fail(message: string): void {
    this.message.set(message);
    this.state.set('error');
  }
}
