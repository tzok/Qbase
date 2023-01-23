import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebbaDaSilvaDialogComponent } from './webba-da-silva-dialog.component';

describe('WebbaDaSilvaDialogComponent', () => {
  let component: WebbaDaSilvaDialogComponent;
  let fixture: ComponentFixture<WebbaDaSilvaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebbaDaSilvaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebbaDaSilvaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
