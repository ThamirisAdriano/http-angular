import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeRxjsComponent } from './unsubscribe-rxjs.component';

describe('UnsubscribeRxjsComponent', () => {
  let component: UnsubscribeRxjsComponent;
  let fixture: ComponentFixture<UnsubscribeRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsubscribeRxjsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
