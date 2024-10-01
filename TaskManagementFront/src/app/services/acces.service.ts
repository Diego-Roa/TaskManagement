import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/settings';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { ResponseAccess } from '../interfaces/response-access';

@Injectable({
  providedIn: 'root',
})
export class AccesService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  login(loginModel: Login): Observable<ResponseAccess> {
    return this.http.post<ResponseAccess>(
      `${this.baseUrl}/login/login`,
      loginModel
    );
  }
}
