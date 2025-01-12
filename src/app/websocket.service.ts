import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket!: WebSocket;

  connect(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: string) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }
}