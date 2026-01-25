import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Expenses } from './expenses';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from '../../../../core/auth/auth.interceptor';
import { provideApiConfig } from '../../../../core/config/api.config';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';

describe('Expenses', () => {
  let component: Expenses;
  let fixture: ComponentFixture<Expenses>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Expenses],
      providers: [
        provideApiConfig(),
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Expenses);
    httpMock = TestBed.inject(HttpTestingController);

    component = fixture.componentInstance;

    fixture.detectChanges();

    try {
      const userInfoRequest = httpMock.expectOne('https://localhost:8100/api/identity/manage/info');
      userInfoRequest.flush({ email: 'test@example.com' });
    } catch { }

    const expensesRequest = httpMock.expectOne('https://localhost:8100/api/expenses/paginated');
    expect(expensesRequest.request.method).toBe('POST');
    expensesRequest.flush({ items: [], totalCount: 0 });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
