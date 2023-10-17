import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.css']
})
export class PackageFormComponent {

constructor(private http:HttpClient) {}

submit(data: any) {
  data.to_location = {lat:data.to_lat,lng:data.to_long}
  data.from_location = {lat:data.from_lat,lng:data.from_long}
  console.log(data);
  this.http.post('http://localhost:3050/api/package',data).subscribe((res)=>{
    console.log(res);
  })
throw new Error('Method not implemented.');
}

}
