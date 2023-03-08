import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneIconsComponent } from './standalone-icons.component';
import { NgxIconComponent, provideIconOptions } from '@vonlof/ngx-icons';

describe('StandaloneIconsComponent', () => {
  jest.spyOn(console, 'warn').mockImplementation();
  let component: StandaloneIconsComponent;
  let fixture: ComponentFixture<StandaloneIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneIconsComponent, NgxIconComponent],
      providers: [
        provideIconOptions({
          icons: [],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
