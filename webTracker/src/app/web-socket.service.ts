import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: WebSocket | undefined;

  initializeWebSocketConnection() {
    this.socket = new WebSocket('ws://YOUR_WEBSOCKET_ENDPOINT');
  
    this.socket.onopen = event => {
      console.log('Connected to the WebSocket');
    };
  
    this.socket.onmessage = message => {
      const data = JSON.parse(message.data);
      // Handle the received data, update the map based on the current location of delivery
    };
  
    this.socket.onclose = event => {
      console.log('WebSocket connection closed');
    };
  }
  

  constructor() { }
}
