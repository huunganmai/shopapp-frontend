import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../response/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { UserResponse } from '../../response/user.response';
import { ApiResponse } from '../../response/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    @ViewChild('loginForm') registerForm!: NgForm;

    phoneNumber: string = '111111';
    password: string = '';
    showPassword: boolean = false;
    rememberLogin: boolean = false;

    roles: Role[] = [];
    selectedRole: Role | undefined;

    userResponse?: UserResponse;
    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService,
        private roleService: RoleService
    ) {}

    ngOnInit() {
        debugger;
        this.roleService.getRoles().subscribe({
            next: (response: ApiResponse) => {
                debugger;
                this.roles = response.data;
                this.selectedRole = response.data.length > 0 ? response.data[0] : undefined;
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error('Error getting roles:', error);
            }
        });
    }

    login() {
        debugger;
        const loginDTO = {
            phone_number: this.phoneNumber,
            password: this.password,
            role_id: this.selectedRole?.id ?? 1
        };

        this.userService.login(loginDTO).subscribe({
            next: (response: ApiResponse) => {
                debugger;
                const { token, refresh_token: refreshToken } = response.data;
                if (this.rememberLogin) {
                    this.tokenService.setTokenToLocalStorage(token);
                    this.tokenService.setRefreshTokenToLocalStorage(refreshToken);
                } else {
                    this.tokenService.setTokenToSessionStorage(token);
                }

                this.userService.getUserDetail(token).subscribe({
                    next: (response: ApiResponse) => {
                        debugger;
                        this.userResponse = {
                            ...response.data,
                            date_of_birth: new Date(response.data.date_of_birth)
                        };

                        if (this.rememberLogin) {
                            debugger;
                            this.userService.saveUserResponseToLocalStorage(this.userResponse);
                        } else {
                            this.userService.saveUserResponseToSessionStorage(this.userResponse);
                        }

                        if (this.userResponse?.role.name == 'admin') {
                            this.router.navigate(['/admin']);
                        } else if (this.userResponse?.role.name == 'user') {
                            this.router.navigate(['/']);
                        }
                    },
                    complete: () => {
                        debugger;
                    },
                    error: (error: HttpErrorResponse) => {
                        debugger;
                        console.error('Cannot fetch user detail: ', error);
                    }
                });
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error('Cannot fetch user detail: ', error);
                alert(`Cannot register, error: ${error.error}`);
            }
        });
    }

    togglePassword() {
        this.showPassword = !this.showPassword;
    }

    onDateOfBirthChange() {}

    // checkPasswordsMatch() {
    //     if (this.password !== this.retypePassword) {
    //         this.registerForm.form.controls['retypePassword'].setErrors({
    //             passwordMismatch: true
    //         });
    //     } else {
    //         this.registerForm.form.controls['retypePassword'].setErrors(null);
    //     }
    // }

    // checkAge() {
    //     if (this.dateOfBirth) {
    //         const today = new Date();
    //         const birthDay = new Date(this.dateOfBirth);
    //         let age = today.getFullYear() - birthDay.getFullYear();
    //         const monthDiff = today.getMonth() - birthDay.getMonth();
    //         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay.getDate())) {
    //             age--;
    //         }

    //         if (age < 18) {
    //             this.registerForm.form.controls['dateOfBirth'].setErrors({
    //                 invalidAge: true
    //             });
    //         } else {
    //             this.registerForm.form.controls['dateOfBirth'].setErrors(null);
    //         }
    //         console.log(`${birthDay}, age: ${age}`);
    //     }
    // }
}
