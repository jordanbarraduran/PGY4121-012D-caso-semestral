import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class NoAuthenticationGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly authService: AuthService
    ){ }
    async canActivate() {
        console.log('Executing guard!')
        const auth = await this.authService.isAuthenticated();
        console.log('User is authenticated:', auth);
        if (!auth) {
            console.log('User is not authenticated, redirecting to Login!')
            await this.router.navigate(['/login']);
        }
        return auth;
    }
}