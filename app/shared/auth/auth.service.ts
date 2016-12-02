import { Injectable } from '@angular/core';

@Injectable()
export abstract class AuthService {

    public abstract login(): void;

    public abstract logout(): void;

    public abstract  get isLoggedIn();

    public abstract  get userName(): string;

}
