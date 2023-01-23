import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarDuplicateCondComponent } from './snackbar-duplicate-cond.component';

describe('SnackbarDuplicateCondComponent', () => {
  let component: SnackbarDuplicateCondComponent;
  let fixture: ComponentFixture<SnackbarDuplicateCondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarDuplicateCondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarDuplicateCondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
