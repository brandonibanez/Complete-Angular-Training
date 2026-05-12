import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  http = inject(HttpClient);

  private token = signal<string>('');

  authToken = this.token.asReadonly();

  ngOnInit(): void {
    this.getToken();
  }

  getToken() : Observable<any> {
    const secret = "t46ymCed8DGmb0WXmRMCyvHZ2qFMMqvj";

    const body = new HttpParams()
    .set('grant_type', 'client_credentials')
    .set('client_id', 'test')
    .set('client_secret', secret);

    const headers = new HttpHeaders()
    .set('Content-Type', "application/x-www-form-urlencoded")

    return this.http.post("http://localhost:80/realms/master/protocol/openid-connect/token", body, { headers });
  }

  constructor() { }
}
