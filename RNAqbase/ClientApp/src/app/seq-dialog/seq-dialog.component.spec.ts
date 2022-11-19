import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeqDialogComponent } from './seq-dialog.component';

describe('SeqDialogComponent', () => {
  let component: SeqDialogComponent;
  let fixture: ComponentFixture<SeqDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeqDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeqDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
