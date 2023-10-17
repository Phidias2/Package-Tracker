import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Package } from './class/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private baseUrl = 'http://localhost:3050/api';

  constructor(private http: HttpClient) { }


  getPackages(): Observable<Package[]> {
    return this.http.get<{ statusCode: number, data: Package[], message: string }>(`${this.baseUrl}/package`)
      .pipe(map((response: { data: any; }) => response.data));
  }
  

  createDelivery(data: any): Observable<any> {
    console.log(data);
    
    return this.http.post(`${this.baseUrl}/delivery`, data);
  }
}
