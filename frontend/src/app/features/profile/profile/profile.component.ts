import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/core/models/profile';
import { ProfileService } from 'src/app/core/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  profile!: Profile;
  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProfile();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phone: ['']
    });
  }

  loadProfile(): void {
    this.loading = true;
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.profile = response.data;
        this.profileForm.patchValue({
          firstName: this.profile.firstName,
          lastName: this.profile.lastName,
          email: this.profile.email,
          phone: this.profile.phone
        });

        this.loading = false;
      },

      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    this.profileService.updateProfile(this.profileForm.getRawValue()).subscribe({
      next: (response) => {
        alert(response.message);

        this.profile = response.data;
        this.saving = false;
      },

      error: (error) => {
        console.error(error);
        this.saving = false;
      }
    });
  }

}
