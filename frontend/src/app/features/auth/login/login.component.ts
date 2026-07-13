import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword = false;
  loading = false;
  selectedRole: 'user' | 'admin' = 'user';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  selectRole(role: 'user' | 'admin'): void {
    this.selectedRole = role;
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      role: this.selectedRole
    };

    console.log('Login Request : ', loginData);

    setTimeout(() => {
      this.loading = false;

      if (this.selectedRole === 'admin') {
        this.router.navigate(['/admin']);
      }
      else {
        this.router.navigate(['/dashboard']);
      }
    }, 1500);
  }
}