import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { OrderDTO } from '../dtos/order/order.dto';
import { HttpUtilService } from './http.util.service';
import { Observable } from 'rxjs';
import { OrderResponse } from '../response/order.response';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private token = this.tokenService.getToken();
    private orderApi = `${environment.apiBaseUrl}/orders`;
    private apiConfig = {
        headers: this.httpUtilService.createHeaders()
    };

    constructor(
        private http: HttpClient,
        private httpUtilService: HttpUtilService,
        private tokenService: TokenService
    ) {}

    placeOrder(orderData: OrderDTO): Observable<OrderResponse> {
        return this.http.post<OrderResponse>(this.orderApi, orderData);
    }

    getOrderById(orderId: number): Observable<any> {
        return this.http.get(`${this.orderApi}/${orderId}`);
    }

    getOrderByKeyword(keyword: string, page: number, limit: number): Observable<OrderResponse[]> {
        const newHeader = this.apiConfig;
        newHeader.headers.set('Authorization', `Bearer ${this.token}`);

        const params = new HttpParams()
            .set('keyword', keyword)
            .set('page', page.toString())
            .set('limit', limit.toString());

        const options = {
            headers: newHeader.headers,
            params: params
        };

        return this.http.get<OrderResponse[]>(`${this.orderApi}/get-orders-by-keyword`, options);
    }

    deleteOrderById(id: number): Observable<any> {
        debugger;
        const newHeader = this.apiConfig;
        newHeader.headers.set('Authorization', `Bearer ${this.token}`);

        return this.http.delete(`${this.orderApi}/${id}`, newHeader);
    }

    updateOrder(id: number, orderData: OrderDTO): Observable<any> {
        return this.http.put(`${this.orderApi}/${id}`, orderData);
    }
}
