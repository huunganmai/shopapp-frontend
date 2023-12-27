import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '../../response/user.response';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    userResponse?: UserResponse | null;
    isPopoverOpen = false;
    activeNavItem: number = 0;

    constructor(private router: Router, private userService: UserService, private tokenService: TokenService) {}

    ngOnInit(): void {
        debugger;
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        const url = this.router.url;
        switch (url) {
            case '/':
                this.activeNavItem = 0;
                break;
            case '/orders':
                this.activeNavItem = 1;
                break;
            case '/notifications':
                this.activeNavItem = 2;
                break;
            default:
                this.activeNavItem = 0;
        }
    }

    setActiveNavItem(index: number) {
        this.activeNavItem = index;
    }

    togglePopover(event: Event) {
        event.preventDefault;
        // this.activeNavItem = 3;
        this.isPopoverOpen = !this.isPopoverOpen;
    }

    handleItemClick(index: number) {
        if (index === 0) {
            debugger;
            this.router.navigate(['/user-profile']);
        } else if (index === 2) {
            this.userService.removeUserResponseFromLocalStorage();
            this.tokenService.removeToken();
            this.userService.getUserResponseFromLocalStorage();
            this.userResponse = this.userService.getUserResponseFromLocalStorage();
        }
        this.isPopoverOpen = false;
    }
}
