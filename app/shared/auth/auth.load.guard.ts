
import {CanLoad, Route, Router} from "@angular/router";
import {SimpleAuthService} from "./simple-auth.service";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthLoadGuard implements CanLoad {
    
    constructor(private authService: AuthService, private router: Router) {
    }

    canLoad(route: Route): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }
        else {
            this.router.navigate(['/home', {needLogin: true}]);
            return false;
        }
    }

}