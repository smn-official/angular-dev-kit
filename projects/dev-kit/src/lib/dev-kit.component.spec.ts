import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevKitComponent } from './dev-kit.component';

describe('DevKitComponent', () => {
  let component: DevKitComponent;
  let fixture: ComponentFixture<DevKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
