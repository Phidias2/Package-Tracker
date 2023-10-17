import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PackageService } from '../package.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Package } from '../class/package';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryComponent implements OnInit {

  packageInput = new FormControl();
  filteredPackages: any[] | undefined;
  isLoading = false;

  allPackages: Package[] = [];
  selectedPackage: Package | undefined;
  router: any;

  fetchGlobalPackages(): void {
    this.packageService.getPackages().subscribe(packages => {
      this.allPackages = packages;
    });
  }


  constructor(private packageService: PackageService) { }

  ngOnInit() {
    this.fetchGlobalPackages();
  
    this.packageInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(filterValue => {
        this.filteredPackages = this.filterPackages(filterValue);
      });
  }
  
  filterPackages(filterValue: string): Package[] {
    return this.allPackages.filter(pkg => 
      pkg.from_name.toLowerCase().includes(filterValue.toLowerCase()) || 
      pkg.to_name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  
  selectPackage(pkg: Package): void {
    
    this.selectedPackage = pkg;
    this.packageInput.setValue(pkg.from_name);
  }
  
  addDelivery(): void {
    
    if (this.selectedPackage) {
      this.packageService.createDelivery({package_id:this.selectedPackage._id})
        .subscribe(response => {
          this.router.navigate(['/home']);
        });
    }
  }
  
}