import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ApiResponse } from '../response/api.response';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http.util.service';

import { environment } from '../environments/environment';
import { RefreshTokenDTO } from '../dtos/user/refresh.token.dto';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'access_token';
    private readonly REFRESH_TOKEN_KEY = 'refresh_token';
    private apiUser = `${environment.apiBaseUrl}/users`;
    private jwtHelperService = new JwtHelperService();
    constructor(private http: HttpClient, private httpUtilService: HttpUtilService) {}

    getToken(): string {
        debugger;
        return localStorage.getItem(this.TOKEN_KEY) ?? sessionStorage.getItem(this.TOKEN_KEY) ?? '';
    }

    getRefreshToken(): string {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY) ?? '';
    }

    setRefreshTokenToLocalStorage(refreshToken: string): void {
        return localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    setTokenToLocalStorage(token: string): void {
        return localStorage.setItem(this.TOKEN_KEY, token);
    }

    setTokenToSessionStorage(token: string): void {
        return sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.TOKEN_KEY);
    }

    removeRefreshToken(): void {
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
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

    refreshToken(refreshTokenDTO: RefreshTokenDTO): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUser}/refresh-token`, refreshTokenDTO, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
