import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { environment } from '../../environments/environment';
import { OrderDTO } from '../../dtos/order/order.dto';
import { OrderResponse } from '../../response/order.response';
import { OrderDetail } from '../../models/order.detail';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-detail',
    templateUrl: './detail-order.component.html',
    styleUrls: ['detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {
    orderResponse: OrderResponse = {
        id: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
        user_id: 0,
        fullname: '',
        phone_number: '',
        email: '',
        address: '',
        note: '',
        order_date: new Date(),
        status: '',
        total_money: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
        shipping_method: '',
        shipping_address: '',
        shipping_date: new Date(),
        payment_method: '',
        order_details: [] // Một mảng rỗng
    };
    constructor(private orderService: OrderService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.getOrderDetails();
    }

    getOrderDetails(): void {
        debugger;
    }
}
