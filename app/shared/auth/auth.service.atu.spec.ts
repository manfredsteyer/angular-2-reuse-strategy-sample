import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {SimpleAuthService} from "./simple-auth.service";

describe('AuthService with Angular Testing Utilities', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: AuthService, useClass: SimpleAuthService}]
        });
    });

    it('should login and logout correctly', inject([AuthService], (authService: AuthService) => {
        authService.login();
        expect(authService.isLoggedIn).toBe(true);
        authService.logout();
        expect(authService.isLoggedIn).toBe(false);
    }));

    it('should set user name to Max after login', inject([AuthService], (authService: AuthService) => {
        authService.login();
        expect(authService.userName).toEqual('Max');
    }));

});
