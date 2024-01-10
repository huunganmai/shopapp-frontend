import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-category',
    templateUrl: './category.admin.component.html',
    styleUrl: './category.admin.component.scss'
})
export class CategoryAdminComponent implements OnInit {
    categories: Category[] = [];

    constructor(private categoryService: CategoryService, private router: Router) {
        debugger;
    }

    ngOnInit(): void {
        debugger;
        this.getCategories(0, 100);
    }

    getCategories(page: number, limit: number) {
        this.categoryService.getCategories(page, limit).subscribe({
            next: (response: any) => {
                debugger;
                this.categories = response;
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't get categories: ", error);
            }
        });
    }

    insertCategory() {
        debugger;
        this.router.navigate(['/admin/categories/insert']);
    }

    updateCategory(id: number) {
        debugger;
        this.router.navigate(['/admin/categories/update', id]);
    }

    deleteCategory(id: number) {
        debugger;
        this.categoryService.deleteCategory(id).subscribe({
            next: (response: any) => {
                debugger;
                alert('Xóa thành công');
                location.reload();
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                console.error("Can't delete category: ", error);
            }
        });
    }
}
