import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../settings/settings';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl: string = appsettings.apiUrl;

  constructor(private http: HttpClient) { }

  Get(url:string): Promise<any> {
    const options = {
      headers: new HttpHeaders ({
        'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
      })
    }
      return new Promise((resolve, reject) => {
        this.http.get(`${this.baseUrl}/${url}`, options).subscribe(data => {
          resolve(data);
         },
          res => {
            resolve(res.error)
          })
         } );
    }


    Post(url:string, body: any): Promise<any> {
      const options = {
        headers: new HttpHeaders ({
          'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
        })
      }
        return new Promise((resolve, reject) => {
          this.http.post(`${this.baseUrl}/${url}`, body, options).subscribe(data => {
            resolve(data);
           },
            res => {
              resolve(res.error)
            })
           } );
      }
}
