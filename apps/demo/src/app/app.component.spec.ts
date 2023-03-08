import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxIconComponent, provideIcons } from '@vonlof/ngx-icons';
import { logoGithubMark } from '../icons/generated';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  jest.spyOn(console, 'warn').mockImplementation();
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgxIconComponent, RouterTestingModule],
      providers: [provideIcons([logoGithubMark])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('copyClipBoard', () => {
    it('should copy to clipboard', () => {
      document.execCommand = jest.fn();
      const execCommandSpy = jest
        .spyOn(document, 'execCommand')
        .mockImplementation();
      component.copyClipboard({
        value: 'npm install @vonlof/ngx-icons',
        copied: false,
      });
      expect(execCommandSpy).toHaveBeenCalled();
    });
  });
});
