import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, 
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      canActivate: [AuthGuard],
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  // {
  //   path: 'user',
  //   component: UserLayoutComponent,
  //   children: [{
  //     path: '',
  //     // canActivate: [AuthGuard],
  //     loadChildren: './layouts/user-layout/user-layout.module#UserLayoutModule'
  //   }]
  // },
  


  // {

  // }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
