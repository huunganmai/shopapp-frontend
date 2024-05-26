import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiResponse } from '../../response/api.response';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    @ViewChild('registerForm') registerForm!: NgForm;

    phoneNumber: string;
    password: string;
    retypePassword: string;
    fullName: string;
    dateOfBirth: Date;
    address: string;
    isAccepted: boolean;

    constructor(private router: Router, private userService: UserService) {
        this.phoneNumber = '';
        this.password = '';
        this.retypePassword = '';
        this.fullName = '';
        this.address = '';
        this.isAccepted = false;
        this.dateOfBirth = new Date();
        this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    }

    onPhoneChange() {
        console.log(`Phone typed: ${this.password}`);
    }

    register() {
        // const message =
        //     `Phone: ${this.phone}` +
        //     `  1: ${this.password}` +
        //     `  2: ${this.retypePassword}` +
        //     `  3: ${this.fullName}` +
        //     `  4: ${this.address}` +
        //     `  5: ${this.isAccepted}` +
        //     `  6: ${this.dateOfBirth}`;
        // alert(message);

        const registerDTO = {
            fullname: this.fullName,
            phone_number: this.phoneNumber,
            address: this.address,
            password: this.password,
            retype_password: this.retypePassword,
            date_of_birth: this.dateOfBirth,
            facebook_account_id: 0,
            google_account_id: 0,
            role_id: 1
        };

        this.userService.register(registerDTO).subscribe({
            next: (response: ApiResponse) => {
                debugger;
                if (response && (response.status === '200' || response.status === '201')) {
                    this.router.navigate(['/login']);
                } else {
                    // Handle error
                }
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                alert(`Cannot register, error: ${error.error}`);
            }
        });
    }

    onDateOfBirthChange() {}

    checkPasswordsMatch() {
        if (this.password !== this.retypePassword) {
            this.registerForm.form.controls['retypePassword'].setErrors({
                passwordMismatch: true
            });
        } else {
            this.registerForm.form.controls['retypePassword'].setErrors(null);
        }
    }

    checkAge() {
        if (this.dateOfBirth) {
            const today = new Date();
            const birthDay = new Date(this.dateOfBirth);
            let age = today.getFullYear() - birthDay.getFullYear();
            const monthDiff = today.getMonth() - birthDay.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay.getDate())) {
                age--;
            }

            if (age < 18) {
                this.registerForm.form.controls['dateOfBirth'].setErrors({
                    invalidAge: true
                });
            } else {
                this.registerForm.form.controls['dateOfBirth'].setErrors(null);
            }
            console.log(`${birthDay}, age: ${age}`);
        }
    }
}
