import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsComponent } from './icons.component';
import { NgxIconModule } from '@vonlof/ngx-icons';

describe('IconsComponent', () => {
  jest.spyOn(console, 'warn').mockImplementation();
  let component: IconsComponent;
  let fixture: ComponentFixture<IconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconsComponent],
      imports: [NgxIconModule.forRoot({ icons: [] })],
    }).compileComponents();

    fixture = TestBed.createComponent(IconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
