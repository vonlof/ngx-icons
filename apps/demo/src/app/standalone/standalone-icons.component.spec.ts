import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneIconsComponent } from './standalone-icons.component';

describe('StandaloneIconsComponent', () => {
  let component: StandaloneIconsComponent;
  let fixture: ComponentFixture<StandaloneIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneIconsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
