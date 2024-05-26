import { Component, OnInit } from '@angular/core';
import { InsertProductDTO } from '../../../../dtos/products/insert.product.dto';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../../response/api.response';

@Component({
    selector: 'app-insert.product.admin',
    templateUrl: './insert.product.admin.component.html',
    styleUrl: './insert.product.admin.component.scss'
})
export class InsertProductAdminComponent implements OnInit {
    insertProductDTO: InsertProductDTO = {
        name: '',
        price: 0,
        description: '',
        category_id: 1,
        images: []
    };
    categories: Category[] = [];

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        debugger;
        this.getCategories(0, 12);
    }

    getCategories(page: number, limit: number) {
        debugger;
        this.categoryService.getCategories(page, limit).subscribe({
            next: (response: ApiResponse) => {
                debugger;
                this.categories = response.data;
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't fetch categories: ", error);
            }
        });
    }

    onFileChange(event: any) {
        let files = event.target.files;
        if (files.length > 5) {
            alert('Please select maximum of 5 files');
            return;
        }
        this.insertProductDTO.images = files;
    }

    insertProduct() {
        debugger;
        this.productService.insertProduct(this.insertProductDTO).subscribe({
            next: (response: ApiResponse) => {
                debugger;
                if (this.insertProductDTO.images.length > 0) {
                    this.productService.uploadImage(response.data.id, this.insertProductDTO.images).subscribe({
                        next: (response: any) => {
                            debugger;
                            this.router.navigate(['..'], { relativeTo: this.route });
                        },
                        complete: () => {
                            debugger;
                        },
                        error: (error: any) => {
                            debugger;
                            console.error("Can't upload image: ", error);
                        }
                    });
                }
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't insert product: ", error);
            }
        });
    }
}
