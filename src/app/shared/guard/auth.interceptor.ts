import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastrService: ToastrService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST') {
      req = req.clone({
        url: 'http://localhost:2000/server/' + req.url,
        headers: req.headers.set('Content-Type', 'application/json')
      });
      if (req.url.match('login')) {
        const user = req.body;
        req = req.clone({
          headers: req.headers.set('Authorization', 'No Auth ' + btoa(unescape(user.email + ':' + user.password))),
        });
      } else {
        if(req.url.match('registerUser')){
          const user = req.body;
          req = req.clone({
            headers: req.headers.set('x-access-token', 'No Auth ' ),
            // body : req.body
          });
        }else{
          // console.log(localStorage.getItem('accessToken'));
        req = req.clone({
          headers: req.headers.set('x-access-token', localStorage.getItem('accessToken'))
        });
        }
      }
      return next.handle(req).pipe(
        tap(event => {
        }, err => {
          if ((err.status === 401 || err.status === 440) && this.router.url !== '/login') {
            let title = '';
            let msg = '';
            // this.toasterService.pop('error', title, msg);
            this.toastrService.error('Fail', 'title');
            return this.router.navigate(['/login']);
          } else if (err.status && err.status !== 434) {
            if (err.error.error) {
              // this.toasterService.pop('error', '', err.error.error);
            this.toastrService.error('error', err.error.error);

            } else {
              this.toastrService.success('Fail', 'err.message');
              // this.toasterService.pop('error', '', err.message);
            }
          }
        }));
    } else {
      console.log("gghfghf")
      req = req.clone({
        url: 'http://localhost:2000/server/' + req.url,
        headers: req.headers.set('Content-Type', 'application/json'),
        // headers: req.headers.set('x-access-token', localStorage.getItem('accessToken'))
      });
      req = req.clone({
        headers: req.headers.set('x-access-token', localStorage.getItem('accessToken'))
      });
            // return next.handle(req);
            return next.handle(req).pipe(
              tap(event => {
                
              }, err => {
                console.log(err.status);
                if ((err.status === 401 || err.status === 440) && this.router.url !== '/login') {
                  localStorage.removeItem('accessToken');
                  this.toastrService.error('Fail', 'Token expired');
                  return this.router.navigate(['/admin-login']);
                } else if (err.status && err.status !== 434) {
                  if (err.error.error) {
                    // this.toasterService.pop('error', '', err.error.error);
                  this.toastrService.error('error', err.error.error);
      
                  } else {
                    this.toastrService.success('Fail', 'err.message');
                    // this.toasterService.pop('error', '', err.message);
                  }
                }
              }));
    }
  }
}
