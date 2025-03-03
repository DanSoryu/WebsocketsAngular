import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import Pusher from 'pusher-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../../core/services/messages.service';
import { IpService } from '../../core/services/ip.service';

@Component({
  selector: 'app-chat',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit {

  username: string = '';
  message: string = '';
  messages: any[] = [];

  constructor(
    private messagesService: MessagesService,
    private ipService: IpService
  ) { }

  ngOnInit() {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('f19492c9cd3edadca29d', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('chat');
    channel.bind('menssage', (data: any) => {
        this.messages.push(data);
      console.log(data);
    });

    // obtener la ip del cliente y setearla como username
    this.ipService.getClientIp().subscribe((data: any) => {
      this.username = data.ip;
    });
  }

  sendMensaje() {
    // hacer peticion a la API
    this.messagesService.postMessage({
      username: this.username,
      message: this.message
    }).subscribe((data: any) => {
      this.message = '';
    });
  }
}