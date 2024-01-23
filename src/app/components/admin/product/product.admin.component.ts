import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-product',
    templateUrl: './product.admin.component.html',
    styleUrl: './product.admin.component.scss'
})
export class ProductAdminComponent implements OnInit {
    keyword: string = '';
    selectedCategoryId: number = 0;
    currentPage: number = 0;
    itemsPerPage: number = 12;
    pages: number[] = [];
    totalPages: number = 0;
    visiblePages: number[] = [];
    products: Product[] = [];

    constructor(private productService: ProductService, private router: Router) {}

    ngOnInit(): void {
        debugger;
        this.currentPage = Number(localStorage.getItem('currentProductAdminPage')) || 0;
        this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    }

    getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
        this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
            next: (response: any) => {
                debugger;
                response.products.forEach((product: Product) => {
                    if (product) {
                        product.url = `${environment.apiBaseUrl}/product_images/${product.thumbnail}`;
                    }
                });
                this.products = response.products;
                this.totalPages = response.totalPages;
                this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't get products: ", error);
            }
        });
    }

    searchProduct() {
        debugger;
        this.currentPage = 0;
        this.itemsPerPage = 12;
        this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
        this.generateVisiblePageArray(this.currentPage, this.totalPages);
    }

    onPageChange(page: number) {
        this.currentPage = page < 0 ? 0 : page;
        localStorage.setItem('currentProductAdminPage', String(this.currentPage));
        this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    }

    insertProduct() {
        debugger;
        this.router.navigate(['/admin/products/insert']);
    }

    updateProduct(productId: number) {
        debugger;
        this.router.navigate(['/admin/products/update', productId]);
    }

    deleteProduct(productDelete: Product) {
        debugger;
        const confirmation = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm');
        if (confirmation) {
            this.productService.deleteProductById(productDelete.id).subscribe({
                next: (response: any) => {
                    debugger;
                    this.products = this.products.filter(product => product.id !== productDelete.id);
                },
                complete: () => {
                    debugger;
                },
                error: (error: any) => {
                    debugger;
                    console.error("Can't delete product: ", error);
                }
            });
        }
    }

    generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
        const maxVisiblePages = 5;
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(currentPage - halfVisiblePages + 1, 1);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
    }
}
