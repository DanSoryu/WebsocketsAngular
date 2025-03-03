import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private url = 'http://192.168.252.187:8000/api/clientes';

  constructor(private http: HttpClient) { }

  postCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente);
  }
  
  obtenerClientes(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}