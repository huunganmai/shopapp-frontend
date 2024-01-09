import { Injectable, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserResponse } from '../response/user.response';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    userResponse?: UserResponse | null;

    constructor(private tokenService: TokenService, private router: Router, private userService: UserService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isTokenExpried = this.tokenService.isTokenExpired();
        const isUserInvalid = this.tokenService.getUserId() > 0;
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        const isAdmin = this.userResponse?.role.name === 'admin';
        debugger;
        if (!isTokenExpried && isUserInvalid && isAdmin) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const AdminGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    debugger;
    return inject(AdminGuard).canActivate(next, state);
};
