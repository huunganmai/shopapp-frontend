import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { TokenService } from './token.service';
import { UserResponse } from '../response/user.response';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiRegister = `${environment.apiBaseUrl}/users/register`;
    private apiLogin = `${environment.apiBaseUrl}/users/login`;
    private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
    token = this.tokenService.getToken();

    private apiConfig = {
        headers: this.httpUtilService.createHeaders()
    };

    constructor(
        private http: HttpClient,
        private httpUtilService: HttpUtilService,
        private tokenService: TokenService
    ) {}

    register(registerDTO: RegisterDTO): Observable<any> {
        return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
    }

    login(loginDTO: LoginDTO): Observable<any> {
        return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
    }

    getUserDetail(token: string) {
        let newHeader = this.apiConfig;
        newHeader.headers.set('Authorization', `Bearer ${this.token}`);
        return this.http.post(this.apiUserDetail, newHeader);
    }

    saveUserResponseToLocalStorage(userResponse?: UserResponse) {
        try {
            if (!userResponse) {
                return;
            }
            localStorage.setItem('user', JSON.stringify(userResponse));
        } catch (error) {
            console.error('Error saving user response to LocalStorage: ', error);
        }
    }

    getUserResponseFromLocalStorage(): UserResponse | null {
        try {
            const userResponseJSON = localStorage.getItem('user');
            if (userResponseJSON == null || userResponseJSON == undefined) {
                return null;
            }
            const userResponse = JSON.parse(userResponseJSON);
            console.log('User data retrieved from local storage');
            return userResponse;
        } catch (error) {
            console.error('Error retrieving user response from local storage: ', error);
            return null;
        }
    }

    removeUserResponseFromLocalStorage(): void {
        try {
            localStorage.removeItem('user');
            console.log('User data removing from local storage');
        } catch (error) {
            console.error('Error remove user data from local storage');
        }
    }
}
