import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Currency, Preferences, Theme } from "src/app/core/models/settings/preferences";
import { SettingsService } from "src/app/core/services/settings/settings.service";
import { ThemeService } from "src/app/core/services/theme/theme.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  loading = false;
  showPasswordForm = false;
  preferences!: Preferences;
  passwordForm!: FormGroup;

  themes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' }
  ];

  currencies = [
    { label: '₹ INR', value: 'INR' },
    { label: '$ USD', value: 'USD' },
    { label: '€ EUR', value: 'EUR' },
    { label: '£ GBP', value: 'GBP' }
  ];

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSettings();
  }

  initializeForm(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  loadSettings(): void {
    this.loading = true;
    this.settingsService.getSettings().subscribe({
      next: (response) => {
        console.log('Settings Response:', response);

        this.loading = false;
        this.preferences = response.preferences;
        this.themeService.applyTheme(this.preferences.theme);
      },

      error: (err) => {
        console.error(err);

        this.loading = false;
      }
    });
  }

  updateTheme(value: string): void {
    this.preferences.theme = value as Theme;
    this.themeService.applyTheme(this.preferences.theme);
    this.savePreferences();
  }

  updateCurrency(value: string): void {
    this.preferences.currency = value as Currency;
    this.savePreferences();
  }

  toggleNotification(type: 'email' | 'budgetAlerts' | 'savingsReminder'): void {
    this.preferences.notifications[type] = !this.preferences.notifications[type];
    this.savePreferences();
  }

  savePreferences(): void {
    this.settingsService.updatePreferences(this.preferences).subscribe();
  }

  openPasswordForm(): void {
    this.showPasswordForm = true;
  }

  closePasswordForm(): void {
    this.showPasswordForm = false;
    this.passwordForm.reset();
  }

  changePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const form = this.passwordForm.value;

    if (form.newPassword !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.settingsService.changePassword(form).subscribe({
      next: () => {
        alert('Password updated successfully');
        this.closePasswordForm();
      }
    });
  }

  deleteAccount(): void {
    if (!confirm('Delete your account permanently?')) {
      return;
    }

    this.settingsService.deleteAccount().subscribe();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}