import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificaEmailService {
  constructor(private http: HttpClient) {}

  verificarEmail(email: string) {
    return this.http.get('assets/emails-servidor.json').pipe(
      delay(2500),
      map((json: any) => json.emails),
      map((emails: { email: string }[]) =>
        emails.some((e) => e.email === email)
      )
    );
  }
}
