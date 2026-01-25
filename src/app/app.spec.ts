import { App } from './app';
import { Sidenav } from './core/sidenav/sidenav';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { authInterceptor } from './core/auth/auth.interceptor';
import { provideApiConfig } from './core/config/api.config';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Sidenav],
      providers: [
        provideApiConfig(),
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    httpMock = TestBed.inject(HttpTestingController);

    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    const userInfoRequest = httpMock.expectOne('https://localhost:8100/api/identity/manage/info');
    userInfoRequest.flush({ email: 'test@example.com' });

    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
