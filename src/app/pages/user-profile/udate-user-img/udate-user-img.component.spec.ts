import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdateUserImgComponent } from './udate-user-img.component';

describe('UdateUserImgComponent', () => {
  let component: UdateUserImgComponent;
  let fixture: ComponentFixture<UdateUserImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdateUserImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdateUserImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
