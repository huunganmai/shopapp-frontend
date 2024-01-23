import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environment';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    products: Product[] = [];
    currentPage: number = 0;
    itemsPerPage: number = 12;
    totalPages: number = 0;
    pages: number[] = [];
    visiblePages: number[] = [];

    keyword: string = '';
    selectedCategoryId: number = 0;
    categories: Category[] = [];

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private router: Router
    ) {
        debugger;
    }

    ngOnInit() {
        debugger;
        this.currentPage = Number(localStorage.getItem('currentProductPage')) || 0;
        this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
        this.getCategories(1, 10);
    }

    getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
        this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
            next: (response: any) => {
                debugger;
                response.products.forEach((product: Product) => {
                    product.url = `${environment.apiBaseUrl}/product_images/${product.thumbnail}`;
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
                console.error('Error fetching product: ', error);
            }
        });
    }

    getCategories(page: number, limit: number) {
        this.categoryService.getCategories(page, limit).subscribe({
            next: (response: Category[]) => {
                debugger;
                this.categories = response;
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                console.error('Error fetching categories: ', error);
            }
        });
    }

    onPageChange(page: number) {
        debugger;
        this.currentPage = page > 0 ? page : 0;
        localStorage.setItem('currentProductPage', String(this.currentPage));
        this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    }

    onProductClick(productId: number) {
        debugger;
        this.router.navigate(['/products', productId]);
    }

    searchProducts() {
        this.currentPage = 0;
        this.itemsPerPage = 12;
        this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
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
}
