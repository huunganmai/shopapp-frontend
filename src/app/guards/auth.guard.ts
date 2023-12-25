import { Injectable, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private tokenService: TokenService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isTokenExpried = this.tokenService.isTokenExpired();
        const isUserInvalid = this.tokenService.getUserId() > 0;
        debugger;
        if (!isTokenExpried && isUserInvalid) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const AuthGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    debugger;
    return inject(AuthGuard).canActivate(next, state);
};
