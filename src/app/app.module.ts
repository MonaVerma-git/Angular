import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import { AdminLoginComponent } from '../app/admin-login/admin-login.component'
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';;
import { AuthGuard } from '../app/shared/guard/auth.guard';
import { AuthInterceptor } from '../app/shared/guard/auth.interceptor';
import { CoreService } from '../app/shared/services/core.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { from } from 'rxjs';

@Injectable()
export class ErrorLogService {
  logError(error: any) {
    if (error instanceof HttpErrorResponse) {
      console.error('There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
    } else if (error instanceof TypeError) {
      console.error('There was a Type error.', error.message);
    } else if (error instanceof Error) {
      console.error('There was a general error.', error.message);
    } else {
      console.error('Nobody threw an error but something happened!', error);
    }
  }
}
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  imports: [
    ToastrModule.forRoot() ,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    // AdminLoginComponent,
    AdminLayoutComponent,
    // UserLayoutComponent,
    
  ],
    providers: [
    AuthGuard,
    CoreService,
    ErrorLogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
