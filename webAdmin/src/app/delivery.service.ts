import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Delivery } from './class/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseUrl = 'http://localhost:3050/api';

  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<{ statusCode: number, data: Delivery[], message: string }>(`${this.baseUrl}/delivery`)
      .pipe(map((response: { data: any; }) => response.data));
  }
}
