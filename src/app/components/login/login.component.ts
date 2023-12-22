import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginResponse } from '../../response/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    @ViewChild('loginForm') registerForm!: NgForm;

    phoneNumber: string = '111111';
    password: string = '';
    rememberLogin: boolean = false;
    showPassword: boolean = false;

    roles: Role[] = [];
    selectedRole: Role | undefined;

    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService,
        private roleService: RoleService
    ) {}

    ngOnInit() {
        debugger;
        this.roleService.getRoles().subscribe({
            next: (roles: Role[]) => {
                debugger;
                this.roles = roles;
                this.selectedRole = roles.length > 0 ? roles[0] : undefined;
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
        const loginDTO = {
            phone_number: this.phoneNumber,
            password: this.password,
            role_id: this.selectedRole?.id ?? 1
        };

        this.userService.login(loginDTO).subscribe({
            next: (response: LoginResponse) => {
                debugger;
                // if (response.token)) {
                //     //this.router.navigate(['/login']);
                // } else {
                //     // Handle error
                // }

                const { token } = response;
                this.tokenService.setToken(token);
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
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
