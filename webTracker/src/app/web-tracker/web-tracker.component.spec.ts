import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTrackerComponent } from './web-tracker.component';

describe('WebTrackerComponent', () => {
  let component: WebTrackerComponent;
  let fixture: ComponentFixture<WebTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebTrackerComponent]
    });
    fixture = TestBed.createComponent(WebTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
