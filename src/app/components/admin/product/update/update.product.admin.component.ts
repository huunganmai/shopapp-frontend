import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateProductDTO } from '../../../../dtos/products/update.product.dto';
import { ProductImage } from '../../../../models/product.image';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../../response/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-update.product.admin',
    templateUrl: './update.product.admin.component.html',
    styleUrl: './update.product.admin.component.scss'
})
export class UpdateProductAdminComponent implements OnInit {
    product: Product;
    productId: number;
    updatedProduct: Product;
    categories: Category[] = [];
    currentIndexImage: number = 0;
    addedProductImage: File[] = [];
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.product = {} as Product;
        this.updatedProduct = {} as Product;
        this.productId = 0;
    }

    ngOnInit(): void {
        debugger;
        this.productId = Number(this.route.snapshot.paramMap.get('id'));
        this.getDetailProduct();
        this.getCategories(1, 100);
    }

    updateProduct() {
        debugger;
        const updateProductDTO: UpdateProductDTO = {
            name: this.updatedProduct.name,
            price: this.updatedProduct.price,
            description: this.updatedProduct.description,
            category_id: this.updatedProduct.category_id
        };
        this.productService.updateProduct(this.productId, updateProductDTO).subscribe({
            next: (response: ApiResponse) => {
                debugger;
            },
            complete: () => {
                debugger;
                this.router.navigate(['/admin/products']);
            },
            error: (error: HttpErrorResponse) => {
                debugger;
                console.error("Can't update product: ", error);
            }
        });
    }

    getDetailProduct(): void {
        debugger;
        this.productService.getDetailProducts(this.productId).subscribe({
            next: (response: ApiResponse) => {
                this.product = response.data;
                this.updatedProduct = { ...response.data };
                this.updatedProduct.product_images.forEach(productImage => {
                    productImage.image_url = `${environment.apiBaseUrl}/product-images/${productImage.image_url}`;
                });
                this.addedProductImage = [];
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't fetch product detail: ", error);
            }
        });
    }

    getCategories(page: number, limit: number) {
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

    thumbnailClick(index: number, imageUrl: string) {
        this.currentIndexImage = index;
        this.product.thumbnail = imageUrl;
    }

    onFileChange(event: any) {
        const files = event.target.files;
        if (this.product.product_images.length + files.length > 5) {
            alert('Maximum 5 images');
            return;
        }

        this.productService.uploadImage(this.product.id, files).subscribe({
            next: (response: ApiResponse) => {
                debugger;
                response.data.forEach((productImage: any) => {
                    productImage.image_url = `${environment.apiBaseUrl}/product-images/${productImage.image_url}`;
                });
                this.product.product_images = [...this.product.product_images, ...response.data];
                event.target.files = null;
            },
            complete: () => {
                debugger;
            },
            error: (error: any) => {
                debugger;
                console.error("Can't upload images: ", error);
            }
        });
    }

    deleteImage(productImageDelete: ProductImage) {
        if (confirm('Are you sure delete you want to remove this image?')) {
            this.productService.deleteProductImage(productImageDelete.id).subscribe({
                next: (response: ApiResponse) => {
                    debugger;
                    this.product.product_images = this.product.product_images.filter(
                        productImage => productImage.id !== productImageDelete.id
                    );
                },
                complete: () => {
                    debugger;
                },
                error: (error: any) => {
                    debugger;
                    console.error("Can't not delete product image: ", error);
                }
            });
        }
    }
}
