import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(private tokenService: TokenService, private userService: UserService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        if (token) {
            req = this.addTokenHeader(req, token);
        }
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    return this.handle401Error(req, next);
                }
                return throwError(() => error);
            })
        );
    }

    private addTokenHeader(req: HttpRequest<any>, token: string) {
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            // this.refreshTokenSubject.next(null);
            const refreshTokenDTO = { refresh_token: this.tokenService.getRefreshToken() };
            return this.tokenService.refreshToken(refreshTokenDTO).pipe(
                switchMap((response: any) => {
                    debugger;
                    this.isRefreshing = false;
                    this.tokenService.setTokenToLocalStorage(response.data.token);
                    this.tokenService.setRefreshTokenToLocalStorage(response.data.refresh_token);
                    return next.handle(this.addTokenHeader(req, response.data.token));
                }),
                catchError(error => {
                    this.isRefreshing = false;
                    this.userService.logout();

                    alert('Phiên đăng nhập hết hạn. Bấm OK để về trang chủ.');
                    this.router.navigate(['/']);

                    throw new Error(error);
                })
            );
        }

        return next.handle(req);
    }
}
