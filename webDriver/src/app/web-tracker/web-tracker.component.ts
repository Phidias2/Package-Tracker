import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as L from 'leaflet'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-web-tracker',
  templateUrl: './web-tracker.component.html',
  styleUrls: ['./web-tracker.component.css']
})

export class WebTrackerComponent implements OnInit, OnDestroy, AfterViewInit {
  private socket!: WebSocket;
  constructor(private http: HttpClient) { }
  locationUpdateSubscription: any;
  private map: any;
  private fromPosition: any;
  private toPosition: any;
  private deliveryPosition: any;
  packageDetails: any;
  deliveryDetails: any;
  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {
    this.socket = new WebSocket('ws://localhost:3050/');

    this.socket.onopen = (event) => {
      console.log('Connected to the WebSocket');
    };

    this.socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log(111,data);
      
      // Handle the received data here, e.g., update the map or some UI elements
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('There was an error with the WebSocket:', error);
    };
  }

  ngAfterViewInit() {
    this.map = L.map('leafletMap').setView([9.322048, 2.313138], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(this.map);
  }


  updateStatus(id:string,status: string) {

      this.http.put(`http://localhost:3050/api/delivery/${id}`, {status:status})
        .subscribe(
          (res: any) => {
            this.deliveryDetails = res.data;
            alert("delivery status updated")
          },
          err => console.error('There was an error fetching delivery details:', err)
        );
  }


getCurrentLocation(): Observable<any> {
  return new Observable((observer) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              position => {
                  observer.next(position);
                  observer.complete();
              },
              error => observer.error(error)
          );
      } else {
          observer.error("Geolocation is not supported by this browser.");
      }
  });
}

startLocationUpdates() {
  this.locationUpdateSubscription = interval(20000)
      .pipe(
          switchMap(() => this.getCurrentLocation()),
          tap(position => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              this.socket.send(JSON.stringify({ latitude, longitude }));
          })
      )
      .subscribe(
          () => {},
          error => console.error('There was an error fetching or sending the location:', error)
      );
}


  ngOnDestroy() {
    if (this.locationUpdateSubscription) {
      this.locationUpdateSubscription.unsubscribe();
    }
    if (this.socket) {
      this.socket.close();
    }
  }

  fetchDelivery(deliveryId: string) {

    this.http.get(`http://localhost:3050/api/delivery/${deliveryId}`)
      .subscribe(
        (res: any) => {
          this.deliveryDetails = res.data;
          if (this.deliveryDetails.location) {
            this.deliveryPosition = L.marker([res.location.lat, res.location.lng]).addTo(this.map);
            this.deliveryPosition.bindPopup("<b>Delivery</b>").openPopup();
          }
          this.getPackageDetails(this.deliveryDetails.package_id)
        },
        err => console.error('There was an error fetching delivery details:', err)
      );
  }


  getPackageDetails(id: string) {

    this.http.get(`http://localhost:3050/api/package/${id}`)
      .subscribe(
        (res: any) => {
          this.packageDetails = res.data;
          // Remove existing markers if they exist
          if (this.fromPosition) {
            this.fromPosition.remove();
          }
          if (this.toPosition) {
            this.toPosition.remove();
          }

          if (this.packageDetails.from_location && this.packageDetails.to_location) {
            this.fromPosition = L.marker([res.from_location.lat, res.from_location.lng]).addTo(this.map);
            this.toPosition = L.marker([res.to_location.lat, res.to_location.lng]).addTo(this.map);

            // Bind popups to the markers
            this.fromPosition.bindPopup("<b>Package</b>").openPopup();
            this.toPosition.bindPopup("<b>Delivery</b>").openPopup();
          }
          
        },
        err => console.error('There was an error fetching package details:', err)
      );
  }


}
