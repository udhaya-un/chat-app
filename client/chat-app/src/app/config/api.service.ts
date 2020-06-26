import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiService {

    csrfToken: string;
    token: string;

    constructor(
        private http: HttpClient
    ) { }

    private setHeaders(): HttpHeaders {
        const headersconfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        return new HttpHeaders(headersconfig);
    }

    private formatErrors(httpresponse: any) {
        return new ErrorObservable(httpresponse);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${path}`, { params: params, headers: this.setHeaders() }).pipe(catchError(this.formatErrors));
    }

    delete(path): Observable<any> {
        return this.http.delete(`${path}`, { headers: this.setHeaders() }).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(`${path}`, JSON.stringify(body), { headers: this.setHeaders() }).pipe(retry(3), catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(`${path}`, JSON.stringify(body), { headers: this.setHeaders() }).pipe(retry(3), catchError(this.formatErrors));
    }

}
