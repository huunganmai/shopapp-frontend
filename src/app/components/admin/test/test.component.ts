import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
    activeItem: number = 0;
    constructor() {
        debugger;
    }

    ngOnInit(): void {
        debugger;
    }

    onItemClick(item: number) {
        this.activeItem = item;
    }
}
