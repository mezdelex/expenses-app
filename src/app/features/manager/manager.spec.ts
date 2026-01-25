import { Categories } from './components/categories/categories';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Expenses } from './components/expenses/expenses';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Manager } from './manager';
import { MatTabsModule } from '@angular/material/tabs';
import { authInterceptor } from '../../core/auth/auth.interceptor';
import { provideApiConfig } from '../../core/config/api.config';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('Manager', () => {
  let component: Manager;
  let fixture: ComponentFixture<Manager>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manager, Categories, Expenses, MatTabsModule],
      providers: [
        provideApiConfig(),
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Manager);
    httpMock = TestBed.inject(HttpTestingController);

    component = fixture.componentInstance;

    fixture.detectChanges();

    try {
      const userInfoRequest = httpMock.expectOne('https://localhost:8100/api/identity/manage/info');
      userInfoRequest.flush({ email: 'test@example.com' });
    } catch { }

    const categoriesRequest = httpMock.expectOne('https://localhost:8100/api/categories/list');
    expect(categoriesRequest.request.method).toBe('POST');
    categoriesRequest.flush([]);

    const expenseRequest = httpMock.expectOne('https://localhost:8100/api/expenses/paginated');
    expect(expenseRequest.request.method).toBe('POST');
    expenseRequest.flush({ items: [], totalCount: 0 });

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
