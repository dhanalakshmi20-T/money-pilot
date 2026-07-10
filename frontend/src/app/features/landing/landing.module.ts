import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
