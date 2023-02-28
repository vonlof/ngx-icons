import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxIconComponent, provideIcons } from '@vonlof/ngx-icons';
import { logoGithubMark } from '../icons/generated';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgxIconComponent],
      providers: [provideIcons([logoGithubMark])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
