import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { UserResponse } from '../../response/user.response';
import { UpdateUserDTO } from '../../dtos/user/update.user.dto';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
    userProfileForm: FormGroup;
    userResponse?: UserResponse;
    token: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private activateRouter: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService
    ) {
        this.userProfileForm = this.formBuilder.group(
            {
                fullname: [''],
                phone_number: ['', [Validators.minLength(3)]],
                address: ['', [Validators.minLength(3)]],
                password: ['', [Validators.minLength(3)]],
                retype_password: ['', [Validators.minLength(3)]],
                date_of_birth: [Date.now()]
            },
            {
                validators: this.passwordMatchValidator // Custom validator function for password match
            }
        );
    }

    ngOnInit(): void {
        debugger;
        this.token = this.tokenService.getToken();
        this.userService.getUserDetail(this.token).subscribe({
            next: (response: any) => {
                debugger;
                this.userResponse = {
                    ...response,
                    date_of_birth: new Date(response.date_of_birth)
                };
                this.userProfileForm.patchValue({
                    fullname: response.fullname,
                    phone_number: response.phone_number,
                    address: response.address,
                    date_of_birth: response.date_of_birth
                });
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error('Cannot fetch user by token: ', error);
            }
        });
    }

    passwordMatchValidator() {}

    save(): void {
        debugger;
        if (this.userProfileForm.valid) {
            const updateUserDTO: UpdateUserDTO = {
                fullname: this.userProfileForm.get('fullname')?.value,
                phone_number: this.userProfileForm.get('phone_number')?.value,
                address: this.userProfileForm.get('address')?.value,
                date_of_birth: this.userProfileForm.get('date_of_birth')?.value,
                password: this.userProfileForm.get('password')?.value,
                retype_password: this.userProfileForm.get('retype_password')?.value
            };
            this.userService.updateUser(this.token, updateUserDTO).subscribe({
                next: (response: any) => {
                    debugger;
                },
                complete: () => {
                    debugger;
                },
                error: (error: any) => {
                    debugger;
                    console.error('Cannot update user: ', error);
                }
            });
        }
    }
}
