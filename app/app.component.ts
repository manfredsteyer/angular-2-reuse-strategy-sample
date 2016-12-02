import { Component } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import {LeaveComponentGuard} from "./shared/deactivation/leave-component-guard";
import {CustomReuseStrategy} from "./shared/router/custom-reuse-strategy";

@Component({
    selector: 'flight-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public info: string = 'Welt';

    public showWaitInfo: boolean = false;

    constructor(private router: Router, private oauthService: OAuthService, private leaveComponentGuard: LeaveComponentGuard ) {

        router.events.subscribe(
            (event) => {

                console.debug('router-event', event);

                if (event instanceof NavigationStart) {
                    this.showWaitInfo = true;
                }
                if (event instanceof NavigationEnd
                    || event instanceof NavigationCancel
                    || event instanceof NavigationError) {
                    this.showWaitInfo = false;
                }

            }
        );

        leaveComponentGuard.guardStated.subscribe(_ => {
            this.showWaitInfo = false;
        });

        leaveComponentGuard.guardFinished.subscribe(_ => {
            this.showWaitInfo = true;
        });

        oauthService.loginUrl = '';


        this.oauthService.loginUrl = 'https://steyer-identity-server.azurewebsites.net/identity/connect/authorize'; // Id-Provider?

        this.oauthService.redirectUri = window.location.origin + '/index.html';

        this.oauthService.clientId = 'spa-demo';

        this.oauthService.issuer = 'https://steyer-identity-server.azurewebsites.net/identity';

        // set the scope for the permissions the client should request
        this.oauthService.scope = 'openid profile email voucher';

        // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
        // OAuth2-based access_token
        this.oauthService.oidc = true;

        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oauthService.setStorage(sessionStorage);

        // To also enable single-sign-out set the url for your auth-server's logout-endpoint here
        this.oauthService.logoutUrl = 'https://steyer-identity-server.azurewebsites.net/identity/connect/endsession?id_token={{id_token}}';

        // This method just tries to parse the token within the url when
        // the auth-server redirects the user back to the web-app
        // It dosn't initiate the login
        this.oauthService.tryLogin({});

    }

    goHome() {
        this.router.navigate(['/home']);
    }

    activateExpertMode() {
        let queryParams = {
            expertMode: 'true'
        };
        this.router.navigate([], {queryParams});
    }

    deactivateExpertMode() {
        let queryParams = {
            expertMode: 'false'
        };
        this.router.navigate([], {queryParams});
        // , fragment: '123'

    }

}



