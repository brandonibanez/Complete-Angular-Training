import { HttpParams, HttpHeaders, HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IS_AUTH_REQUST } from '../auth/auth-interceptor.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  private token = signal<string | null>(null);
  authToken = this.token.asReadonly();

  constructor() {
    this.fetchInitialToken();
  }

  private fetchInitialToken(): void {
    const secret = "t46ymCed8DGmb0WXmRMCyvHZ2qFMMqvj";
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', 'test')
      .set('client_secret', secret);

    const headers = new HttpHeaders()
      .set('Content-Type', "application/x-www-form-urlencoded");

    this.http.post<any>("http://localhost:80/realms/master/protocol/openid-connect/token", body, { 
      headers,
      context: new HttpContext().set(IS_AUTH_REQUST, true)
     })
      .subscribe({
        next: (res) => this.token.set(res.access_token),
        error: (err) => console.error('Auth failed', err)
      });
  }

  // getToken(): Observable<any> {
  //   const secret = "t46ymCed8DGmb0WXmRMCyvHZ2qFMMqvj";

  //   const body = new HttpParams()
  //     .set('grant_type', 'client_credentials')
  //     .set('client_id', 'test')
  //     .set('client_secret', secret);

  //   const headers = new HttpHeaders()
  //     .set('Content-Type', "application/x-www-form-urlencoded")

  //   return this.http.post("http://localhost:80/realms/master/protocol/openid-connect/token", body, { headers });
  // }


}
