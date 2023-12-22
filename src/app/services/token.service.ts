import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private jwtHelperService = new JwtHelperService();
    constructor() {}

    getToken(): string {
        return localStorage.getItem(this.TOKEN_KEY) ?? '';
    }

    setToken(token: string): void {
        return localStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken(): void {
        return localStorage.removeItem(this.TOKEN_KEY);
    }

    getUserId(): number {
        debugger;
        const token = this.getToken();
        if (!token) {
            return 0;
        }
        let userObject = this.jwtHelperService.decodeToken(token);
        return 'user_id' in userObject ? parseInt(userObject['user_id']) : 0;
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        return this.jwtHelperService.isTokenExpired(token);
    }
}
