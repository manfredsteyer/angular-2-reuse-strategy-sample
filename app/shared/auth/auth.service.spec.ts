import { AuthService } from './auth.service';
import {SimpleAuthService} from "./simple-auth.service";

describe('AuthService', () => {

    let authService: AuthService;

    beforeEach(() => {
        authService = new SimpleAuthService();
    });

    it('should login and logout correctly', () => {
        authService.login();
        expect(authService.isLoggedIn).toBe(true);
        authService.logout();
        expect(authService.isLoggedIn).toBe(false);
    });

    it('should set user name to Max after login', () => {
        authService.login();
        expect(authService.userName).toEqual('Max');
    });

});
