import { Component, AfterViewInit } from '@angular/core';
import { Package } from '../class/package';
import * as L from 'leaflet'
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-web-tracker',
  templateUrl: './web-tracker.component.html',
  styleUrls: ['./web-tracker.component.css']
})
export class WebTrackerComponent implements AfterViewInit {

  constructor(private http: HttpClient) { }
  private map: any;
  private fromPosition: any;
  private toPosition: any;
  private deliveryPosition: any;
  packageDetails: any;
  deliveryDetails: any;

  socket: WebSocket | undefined;

  initializeWebSocketConnection() {
    this.socket = new WebSocket('ws://YOUR_WEBSOCKET_ENDPOINT');

    this.socket.onopen = event => {
      console.log('Connected to the WebSocket');
    };

    this.socket.onmessage = message => {
      const data = JSON.parse(message.data);
      console.log(222,data);
      
      // Handle the received data, update the map based on the current location of delivery
    };

    this.socket.onclose = event => {
      console.log('WebSocket connection closed');
    };
  }

  ngAfterViewInit() {
    this.map = L.map('leafletMap').setView([9.322048, 2.313138], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(this.map);
  }

  getPackageDetails(data: any) {
    this.http.get(`http://localhost:3050/api/package/${data.id}`)
      .subscribe(
        (res: any) => {
          this.packageDetails = res.data;
          if (res.data.active_delivery) {
            this.fetchDelivery(res.data.active_delivery_id)
            this.initializeWebSocketConnection();
          }
          if (this.fromPosition) {
            this.fromPosition.remove();
          }
          if (this.deliveryPosition) {
            this.deliveryPosition.remove();
          }

          // Create new markers based on the response data
          this.fromPosition = L.marker([res.from_location.lat, res.from_location.lng]).addTo(this.map);
          this.toPosition = L.marker([res.to_location.lat, res.to_location.lng]).addTo(this.map);

          // Bind popups to the markers
          this.fromPosition.bindPopup("<b>Package from</b>").openPopup();
          this.toPosition.bindPopup("<b>Package to</b>").openPopup();
        },
        err => console.error('There was an error fetching package details:', err)
      );
  }

  fetchDelivery(deliveryId: string) {

    this.http.get(`http://localhost:3050/api/package/${deliveryId}`)
      .subscribe(
        (res: any) => {
          this.deliveryDetails = res.data;
          this.deliveryPosition = L.marker([res.deliveryLat, res.deliveryLng]).addTo(this.map);
          this.deliveryPosition.bindPopup("<b>Delivery</b>").openPopup();
        },
        err => console.error('There was an error fetching delivery details:', err)
      );
  }

}
