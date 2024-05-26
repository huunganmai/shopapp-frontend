import { Component, OnInit } from '@angular/core';
import { InsertCategoryDTO } from '../../../../dtos/category/insert.category.dto';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-insert.category.admin',
    templateUrl: './insert.category.admin.component.html',
    styleUrl: './insert.category.admin.component.scss'
})
export class InsertCategoryAdminComponent implements OnInit {
    insertCategoryDTO: InsertCategoryDTO = {
        name: ''
    };

    constructor(private categoryService: CategoryService, private router: Router) {}

    ngOnInit(): void {}

    insertCategory(insertCategoryDTO: InsertCategoryDTO) {
        debugger;
        this.categoryService.insertCategory(insertCategoryDTO).subscribe({
            next: response => {
                debugger;
                this.router.navigate(['/admin/categories']);
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't insert category: ", error);
            }
        });
    }
}
