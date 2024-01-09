import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../response/user.response';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
    userResponse?: UserResponse | null;
    constructor(private router: Router, private tokenService: TokenService, private userService: UserService) {}

    ngOnInit(): void {
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }

    showAdminComponent(componentName: string): void {
        switch (componentName) {
            case 'orders':
                this.router.navigate(['/admin/orders']);
                break;
            case 'categories':
                this.router.navigate(['/admin/categories']);
                break;
            case 'products':
                this.router.navigate(['/admin/products']);
                break;
            default:
        }
    }

    logout() {
        this.userService.removeUserResponseFromLocalStorage();
        this.tokenService.removeToken();
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        this.router.navigate(['/']);
    }
}
