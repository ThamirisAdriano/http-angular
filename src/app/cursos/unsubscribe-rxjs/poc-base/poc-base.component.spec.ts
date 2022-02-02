import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocBaseComponent } from './poc-base.component';

describe('PocBaseComponent', () => {
  let component: PocBaseComponent;
  let fixture: ComponentFixture<PocBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
