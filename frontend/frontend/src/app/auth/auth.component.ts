import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` <div class="auth-container">
    <h2>Login</h2>
    <form [formGroup]="profileForm" (ngSubmit)="login()">
      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <label>
        Password
        <input type="text" formControlName="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>`,
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const email = this.profileForm.value.email;
    const password = this.profileForm.value.password;
    if (email && password) {
      this.authService.login(email, password).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/']);
          localStorage.setItem('session', JSON.stringify(res));
        },
        (err) => {
          console.log(err);
          alert('Invalid email/password');
          this.profileForm.reset();
        }
      );
    }
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  whoami(): void {
    this.authService.whoami().subscribe((res) => {
      console.log(res);
    });
  }
}
