import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateOperDialogComponent } from './date-oper-dialog.component';

describe('DateOperDialogComponent', () => {
  let component: DateOperDialogComponent;
  let fixture: ComponentFixture<DateOperDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateOperDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateOperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
