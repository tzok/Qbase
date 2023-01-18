import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFileDialogComponent } from './save-file-dialog.component';

describe('SaveFileDialogComponent', () => {
  let component: SaveFileDialogComponent;
  let fixture: ComponentFixture<SaveFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
