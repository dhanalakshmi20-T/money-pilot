import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginRequest } from "src/app/core/models/auth/login-request";
import { LoginResponse } from "src/app/core/models/auth/login-response";
import { AuthService } from "src/app/core/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();

      if (user?.role === 'ADMIN') {
        this.router.navigate(['/admin']);
      }
      else {
        this.router.navigate(['/dashboard']);
      }

      return;
    }

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

  login(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const request: LoginRequest = {
      email: this.f.email.value,
      password: this.f.password.value
    };

    this.authService.login(request).subscribe({
      next: (response: LoginResponse) => {
        console.log("======== LOGIN RESPONSE ========");
        console.log(response);
        console.log("Success:", response.success);
        console.log("Message:", response.message);
        console.log("Token:", response.token);
        console.log("User:", response.user);
        console.log("================================");

        this.loading = false;
        this.authService.saveSession(response);

        console.log("Saved Token :", localStorage.getItem("token"));
        console.log("Saved User :", localStorage.getItem("user"));

        if (response.user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/dashboard']);
        }
      },

      error: (error) => {
        console.error("LOGIN ERROR");
        console.error(error);

        this.loading = false;
        this.errorMessage = error.console.error?.message || 'Invalid email or password';
      }
    });
  }
}