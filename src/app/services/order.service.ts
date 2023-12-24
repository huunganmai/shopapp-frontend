import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { OrderDTO } from '../dtos/order/order.dto';
import { HttpUtilService } from './http.util.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderApi = `${environment.apiBaseUrl}/orders`;

    constructor(private http: HttpClient, private httpUtilService: HttpUtilService) {}

    placeOrder(orderData: OrderDTO) {
        return this.http.post(this.orderApi, orderData);
    }

    getOrderById(orderId: number): Observable<any> {
        return this.http.get(`${this.orderApi}/${orderId}`);
    }
}
