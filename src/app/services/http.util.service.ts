import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class HttpUtilService {
    constructor(private tokenService: TokenService) {}

    createHeaders(acceptLanguage: string): HttpHeaders {
        return new HttpHeaders({
            'Accept-Language': acceptLanguage
        });
    }
}
