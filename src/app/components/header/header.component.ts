import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    activeNavItem: number = 0;

    ngOnInit(): void {
        const storageNavItem = localStorage.getItem('active_nav_item');
        if (storageNavItem) {
            this.activeNavItem = parseInt(storageNavItem);
        }
    }

    setActiveNavItem(index: number) {
        this.activeNavItem = index;
        localStorage.setItem('active_nav_item', JSON.stringify(index));
    }
}
