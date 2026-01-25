import { AddExpenseDialog } from './add-expense-dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { authInterceptor } from '../../../../core/auth/auth.interceptor';
import { provideApiConfig } from '../../../../core/config/api.config';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';

describe('AddExpenseDialog', () => {
  let component: AddExpenseDialog;
  let fixture: ComponentFixture<AddExpenseDialog>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExpenseDialog],
      providers: [
        provideApiConfig(),
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        provideRouter(routes),
        { provide: MAT_DIALOG_DATA, useValue: { categoriesResource: { value: () => [] } } },
        { provide: MatDialogRef, useValue: { close: () => { } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpenseDialog);
    httpMock = TestBed.inject(HttpTestingController);

    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
