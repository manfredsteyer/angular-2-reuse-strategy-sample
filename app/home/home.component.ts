import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthService } from '../shared/auth/auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SimpleAuthService } from "../shared/auth/simple-auth.service";

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(private authService: AuthService, private route: ActivatedRoute) {
    }

    needLogin: boolean;

    ngOnInit() {

        this.route.params.subscribe((p) => {
            this.needLogin = (p['needLogin'] == 'true');
        });


    }

    login() {
        this.authService.login();
        this.needLogin = false;
    }

    logout() {
        this.authService.logout();
    }

    get userName() {
        return this.authService.userName;
    }
}