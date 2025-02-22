import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        error => {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      );
    }
  }
  public logout() {
		localStorage.clear();
		this.router.navigateByUrl('/login');
	}
}
