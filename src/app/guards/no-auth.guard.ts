import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService
    ){ }
    async canActivate() {
        console.log('Executing guard!')
        const auth = await this.authService.isAuthenticated();
        console.log('User is authenticated:', auth);
        if (auth) {
            console.log('User is authenticated, redirecting to Home!')
            await this.router.navigate(['/home']);
        }
        return !auth;
    }
}