import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturesComponent } from './features/features.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { DashboardPreviewComponent } from './dashboard-preview/dashboard-preview.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { WhyChooseComponent } from './why-choose/why-choose.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    HowItWorksComponent,
    CallToActionComponent,
    DashboardPreviewComponent,
    FaqComponent,
    FooterComponent,
    LandingComponent,
    TestimonialsComponent,
    WhyChooseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LandingPageRoutingModule
  ]
})
export class LandingPageModule { }
