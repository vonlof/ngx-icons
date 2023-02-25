import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxIconComponent } from './ngx-icon.component';
import { provideIconOptions } from './providers';
import { NgxIconOptions } from './ngx-icon.interface';

const solidTestIcon: {
  name: 'solidTestIcon';
  data: string;
} = {
  name: 'solidTestIcon',
  data: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>`,
};

describe('NgxIconComponent', () => {
  let component: NgxIconComponent;
  let fixture: ComponentFixture<NgxIconComponent>;
  const options: NgxIconOptions = {
    icons: [solidTestIcon],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxIconComponent],
      providers: [provideIconOptions(options)],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('name', () => {
    it('should set icon by name', () => {
      component.name = 'solidTestIcon';
      expect((component as any).lastKey).toBe('solidTestIcon');
    });

    it('should not set icon when not found', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const sanitizerSpy = jest.spyOn(
        (component as any).sanitizer,
        'bypassSecurityTrustHtml'
      );
      component.name = 'iconThatNotExist';
      expect(sanitizerSpy).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
