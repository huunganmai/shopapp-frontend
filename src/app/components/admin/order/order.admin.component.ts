import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../../response/order.response';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../response/api.response';

@Component({
    selector: 'app-order.admin',
    templateUrl: './order.admin.component.html',
    styleUrl: './order.admin.component.scss'
})
export class OrderAdminComponent implements OnInit {
    currentPage: number = 0;
    itemsPerPage: number = 12;
    pages: number[] = [];
    totalPages: number = 0;
    visiblePages: number[] = [];
    orders: OrderResponse[] = [];
    keyword: string = '';

    constructor(private orderService: OrderService, private router: Router) {}

    ngOnInit(): void {
        debugger;
        this.currentPage = Number(localStorage.getItem('currentOrderAdminPage'));
        this.getAllOrder(this.keyword, this.currentPage, this.itemsPerPage);
    }

    searchOrder() {
        this.currentPage = 0;
        this.itemsPerPage = 12;
        debugger;
        this.getAllOrder(this.keyword, this.currentPage, this.itemsPerPage);
    }

    getAllOrder(keyword: string, page: number, limit: number) {
        debugger;
        this.orderService.getOrderByKeyword(keyword, page, limit).subscribe({
            next: (response: ApiResponse) => {
                debugger;
                this.orders = response.data.orderResponses;
                this.totalPages = response.data.totalPages;
                this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't fetch all orders");
            }
        });
    }

    viewDetails(order: OrderResponse) {
        debugger;
        this.router.navigate(['/admin/orders', order.id]);
    }

    deleteOrder(id: number) {
        debugger;
        const confirmation = window.confirm('Are you sure you want to delete this order?');
        if (confirmation) {
            this.orderService.deleteOrderById(id).subscribe({
                next: (response: any) => {
                    debugger;
                    location.reload();
                },
                complete: () => {
                    debugger;
                },
                error: (error: any) => {
                    debugger;
                    console.error("Can't delete order with id: ", id, ' ', error);
                }
            });
        }
    }

    generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
        const maxVisiblePage = 5;
        const halfVisiblePage = Math.floor(maxVisiblePage / 2);

        let startPage = Math.max(currentPage - halfVisiblePage + 1, 1);
        let endPage = Math.min(startPage + maxVisiblePage - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePage) {
            startPage = Math.max(endPage - maxVisiblePage + 1, 1);
        }

        return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
    }

    onPageChange(page: number) {
        debugger;
        this.currentPage = page < 0 ? 0 : page;
        localStorage.setItem('currentOrderAdminPage', page.toString());
        this.getAllOrder(this.keyword, this.currentPage, this.itemsPerPage);
    }
}
