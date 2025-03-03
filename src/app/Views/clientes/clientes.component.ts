import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import Pusher from 'pusher-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../core/services/clientes.service';

@Component({
  selector: 'app-clientes',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: any[] = [];

  constructor(private clientesService: ClientesService, private ngZone: NgZone) { }

  ngOnInit() {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('f19492c9cd3edadca29d', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('clientes');
    channel.bind('obtener-clientes', (data: any) => {
      this.ngZone.run(() => {
        this.clientes = data.clientes;
      });
      console.log(data);
    });

    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clientesService.obtenerClientes().subscribe((data: any) => {
      this.clientes = data;
    });
  }
}