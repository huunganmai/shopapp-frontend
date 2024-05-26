import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCategoryDTO } from '../../../../dtos/category/update.category.dto';
import { ApiResponse } from '../../../../response/api.response';

@Component({
    selector: 'app-update.category.admin',
    templateUrl: './update.category.admin.component.html',
    styleUrl: './update.category.admin.component.scss'
})
export class UpdateCategoryAdminComponent implements OnInit {
    updateCategoryDTO: UpdateCategoryDTO = {
        name: ''
    };
    categoryId: number = 0;

    constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        debugger;
        this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
        this.getDetailCategory(this.categoryId);
    }

    getDetailCategory(categoryId: number) {
        this.categoryService.getDetailCategory(categoryId).subscribe({
            next: (response: ApiResponse) => {
                debugger;
                this.updateCategoryDTO.name = response.data.name;
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't get detail category: ", error);
            }
        });
    }

    updateCategory(updateCategoryDTO: UpdateCategoryDTO) {
        debugger;
        this.categoryService.updateCategory(this.categoryId, this.updateCategoryDTO).subscribe({
            next: (response: any) => {
                debugger;
                this.router.navigate(['/admin/categories']);
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't update category: ", error);
            }
        });
    }
}
