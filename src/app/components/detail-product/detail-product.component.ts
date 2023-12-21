import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductImage } from '../../models/product.image';
import { environment } from '../../environments/environment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  isPressedAddToCart: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
  
  }

  ngOnInit() {
    const idParam = 5;
    if(idParam !== null) {
      this.productId = +idParam;
    }
    if(!isNaN(this.productId)) {
      this.productService.getDetailProducts(this.productId).subscribe({
        next: (response: any) => {
          debugger
          if(response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {
              product_image.image_url = `${environment.apiBaseUrl}/products/images/${product_image.image_url}`
            })
          }
          debugger
          this.product = response;
          this.showImage(0);
        },
        complete: () => {
          debugger
        },
        error: (error: any) => {
          console.error("Error fetching detail product: ", error);
        }
      })
    }
  }

  showImage(index: number): void {
    debugger;
    if(this.product && this.product.product_images && this.product.product_images.length > 0) {
      if(index < 0) {
        index = 0
      } else if (index >= this.product.product_images.length) {
        index = this.product.product_images.length - 1;
      }
      this.currentImageIndex = index;
    }
  }

  nextImage(): void {
    debugger;
    this.showImage(this.currentImageIndex + 1)
  }

  previousImage(): void {
    debugger;
    this.showImage(this.currentImageIndex - 1);
  }

  thumbnailClick(index: number): void {
    debugger;
    this.showImage(index);
  }

  addToCart(): void {
    debugger;
    this.isPressedAddToCart = true;
    if(this.product) {
      this.cartService.addToCart(this.product.id, this.quantity)
    } else {
      console.error('Cannot add product to cart: Product is null');
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if(this.quantity > 1) {
      this.quantity--;
    }
  }

  getTotalPrice(): number {
    if(this.product) {
      return this.product.price * this.quantity;
    }
    return 0;
  }

  buyNow(): void {
    if(this.isPressedAddToCart) {
      this.addToCart();
    }
  }
}
