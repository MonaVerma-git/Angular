import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login.component';

@NgModule({
  imports: [
    CommonModule,
    AdminLoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    AdminLoginComponent
  ]
})
export class AdminLoginModule { }
