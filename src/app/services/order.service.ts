import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { OrderDTO } from '../dtos/order/order.dto';
import { HttpUtilService } from './http.util.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderApi = `${environment.apiBaseUrl}/orders`;

    constructor(private http: HttpClient, private httpUtilService: HttpUtilService) {}

    placeOrder(orderData: OrderDTO) {
        return this.http.post(this.orderApi, orderData);
    }
}
