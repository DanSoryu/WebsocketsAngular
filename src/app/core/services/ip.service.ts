import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  private ipApiUrl = 'https://api.ipify.org?format=json';

  constructor(private http: HttpClient) { }

  getClientIp(): Observable<any> {
    return this.http.get(this.ipApiUrl);
  }
}
