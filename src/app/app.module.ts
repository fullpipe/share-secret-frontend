import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SealComponent } from './seal/seal.component';

@NgModule({
    declarations: [AppComponent, SealComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
