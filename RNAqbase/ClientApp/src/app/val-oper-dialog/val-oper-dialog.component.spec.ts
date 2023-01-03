import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValOperDialogComponent } from './val-oper-dialog.component';

describe('ValOperDialogComponent', () => {
  let component: ValOperDialogComponent;
  let fixture: ComponentFixture<ValOperDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValOperDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValOperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
