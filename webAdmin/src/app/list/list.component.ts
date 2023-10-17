import { Component } from '@angular/core';
import { Package } from '../class/package';
import { PackageService } from '../package.service';
import { Delivery } from '../class/delivery';
import { DeliveryService } from '../delivery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  packages: Package[] = [];
  deliveries: Delivery[] = [];
  constructor(private packageService: PackageService, private deliveryService: DeliveryService, private router: Router) { }
  ngOnInit() {
    this.packageService.getPackages().subscribe(packages => {
      this.packages = packages;
    });

    this.deliveryService.getDeliveries().subscribe((deliveries: Delivery[]) => {
      this.deliveries = deliveries;
    });
  }

}
