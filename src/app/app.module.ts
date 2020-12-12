import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SealComponent } from './seal/seal.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { RouterModule } from '@angular/router';
import { UnsealComponent } from './unseal/unseal.component';

@NgModule({
    declarations: [AppComponent, SealComponent, WelcomeComponent, HowItWorksComponent, UnsealComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, RouterModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
