import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private url = 'http://192.168.252.187:8000/api/messages';

  constructor(private http: HttpClient) { }

  postMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.url, message);
  }
}