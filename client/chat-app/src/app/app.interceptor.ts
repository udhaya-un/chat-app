import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private appService: AppService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.appService.getToken()
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set("Authorization", token) });
          }
        // req = req.clone({
        //     setHeaders: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         // 'Authorization': token
        //     }
        // });
        return next.handle(authReq);
    }
}