import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { OrderDTO } from '../../dtos/order/order.dto';
import { TokenService } from '../../services/token.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { OrderResponse } from '../../response/order.response';
import { ApiResponse } from '../../response/api.response';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
    orderForm: FormGroup;
    quantity: number = 1;
    cartItems: { product: Product; quantity: number }[] = [];
    coupon: string = '';
    totalAmount: number = 0;
    orderData: OrderDTO = {
        user_id: 0,
        fullname: '',
        email: '',
        phone_number: '',
        address: '',
        status: 'pending',
        note: '',
        total_money: 0,
        payment_method: 'cod',
        shipping_method: 'express',
        coupon_code: '',
        cart_items: []
    };

    constructor(
        private orderService: OrderService,
        private tokenService: TokenService,
        private cartService: CartService,
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        debugger;
        this.orderForm = this.formBuilder.group({
            fullname: ['', Validators.required],
            email: ['', Validators.email],
            phone_number: ['', [Validators.required, Validators.minLength(6)]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            note: [''],
            shipping_method: ['express'],
            payment_method: ['cod']
        });
    }

    ngOnInit(): void {
        debugger;
        this.orderData.user_id = this.tokenService.getUserId();
        const cart = this.cartService.getCart();
        const productIds = Array.from(cart.keys());

        if (productIds.length === 0) {
            return;
        }

        this.productService.getProductByIds(productIds).subscribe({
            next: (response: ApiResponse) => {
                this.cartItems = productIds.map(productId => {
                    debugger;
                    const product = response.data.find((product: any) => product.id === productId);
                    if (product) {
                        product.thumbnail = `${environment.apiBaseUrl}/product-images/${product.thumbnail}`;
                    }
                    return {
                        product: product!,
                        quantity: cart.get(productId)!
                    };
                });
            },
            complete: () => {
                debugger;
                this.calculateTotal();
            },
            error: (error: any) => {
                debugger;
                console.error('Error fetching detail:', error);
            }
        });
    }

    placeOrder() {
        debugger;
        if (this.orderForm.valid) {
            this.orderData = {
                ...this.orderData,
                ...this.orderForm.value
            };
            this.orderData.cart_items = this.cartItems.map(cartItem => ({
                product_id: cartItem.product.id,
                quantity: cartItem.quantity
            }));
            if (this.orderData.cart_items.length === 0) {
                alert('Cart empty');
                return;
            }
            this.orderService.placeOrder(this.orderData).subscribe({
                next: (response: ApiResponse) => {
                    debugger;
                    alert('Đặt hàng thành công');
                    this.cartService.clearCart();
                    this.router.navigate([`/orders/${response.data.id}`]);
                },
                complete: () => {
                    debugger;
                    this.calculateTotal();
                },
                error: (error: any) => {
                    debugger;
                    console.error('Cannot order: ', error);
                }
            });
        } else {
            alert('Dữ liệu không hợp lệ');
        }
    }

    calculateTotal(): void {
        this.totalAmount = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }

    decreaseQuantity(index: number): void {
        if (this.cartItems[index].quantity > 1) {
            this.cartItems[index].quantity--;
            this.calculateTotal();
        }
    }

    increaseQuantity(index: number): void {
        this.cartItems[index].quantity++;
        this.calculateTotal();
    }

    confirmDelete(index: number) {}
}
