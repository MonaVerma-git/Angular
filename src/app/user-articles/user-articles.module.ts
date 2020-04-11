import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserArticlesRoutingModule } from './user-articles-routing.module';
import { UserArticlesComponent } from './user-articles.component';

@NgModule({
  imports: [
    CommonModule,
    UserArticlesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    UserArticlesComponent
  ]
})
export class UserArticlesModule { }
