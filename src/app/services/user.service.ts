import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { TokenService } from './token.service';
import { UserResponse } from '../response/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';
import { ApiResponse } from '../response/api.response';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiRegister = `${environment.apiBaseUrl}/users/register`;
    private apiLogin = `${environment.apiBaseUrl}/users/login`;
    private apiUserDetail = `${environment.apiBaseUrl}/users/details`;

    private apiConfig = {
        headers: this.httpUtilService.createHeaders('vi')
    };

    token = this.tokenService.getToken();

    constructor(
        private http: HttpClient,
        private httpUtilService: HttpUtilService,
        private tokenService: TokenService
    ) {}

    register(registerDTO: RegisterDTO): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.apiRegister, registerDTO, this.apiConfig);
    }

    login(loginDTO: LoginDTO): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.apiLogin, loginDTO, this.apiConfig);
    }

    getUserDetail(token: string): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.apiUserDetail, this.apiConfig);
    }

    updateUser(token: string, updatedUserDTO: UpdateUserDTO): Observable<ApiResponse> {
        let newHeader = this.apiConfig;
        newHeader.headers.set('Authorization', `Bearer ${this.token}`);
        const id = this.tokenService.getUserId();
        return this.http.put<ApiResponse>(`${this.apiUserDetail}/${id}`, updatedUserDTO, newHeader);
    }

    saveUserResponseToLocalStorage(userResponse?: UserResponse) {
        try {
            debugger;
            if (!userResponse) {
                return;
            }
            localStorage.setItem('user', JSON.stringify(userResponse));
        } catch (error) {
            console.error('Error saving user response to LocalStorage: ', error);
        }
    }

    saveUserResponseToSessionStorage(userResponse?: UserResponse) {
        try {
            debugger;
            if (!userResponse) {
                return;
            }
            sessionStorage.setItem('user', JSON.stringify(userResponse));
        } catch (error) {
            console.error('Error saving user response to Sesstion Storage: ', error);
        }
    }

    getUserResponseFromStorage(): UserResponse | null {
        try {
            const userResponseJSON = localStorage.getItem('user') ?? sessionStorage.getItem('user');
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

    removeUserResponseFromStorage(): void {
        try {
            localStorage.removeItem('user');
            console.log('User data removing from local storage');
        } catch (error) {
            console.error('Error remove user data from local storage');
        }
    }
}
