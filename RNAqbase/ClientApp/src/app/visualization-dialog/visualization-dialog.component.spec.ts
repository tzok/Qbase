import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationDialogComponent } from './visualization-dialog.component';

describe('VisualizationDialogComponent', () => {
  let component: VisualizationDialogComponent;
  let fixture: ComponentFixture<VisualizationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
