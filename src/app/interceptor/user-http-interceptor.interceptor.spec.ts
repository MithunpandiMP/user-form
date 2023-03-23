import { TestBed } from '@angular/core/testing';

import { UserHttpInterceptorInterceptor } from './user-http-interceptor.interceptor';

describe('UserHttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserHttpInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UserHttpInterceptorInterceptor = TestBed.inject(UserHttpInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
