import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { OrderDTO } from '../dtos/order/order.dto';
import { HttpUtilService } from './http.util.service';
import { Observable } from 'rxjs';
import { OrderResponse } from '../response/order.response';
import { TokenService } from './token.service';
import { ApiResponse } from '../response/api.response';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderApi = `${environment.apiBaseUrl}/orders`;
    private apiAuthConfig = {
        headers: this.httpUtilService.createHeaders('vi')
    };

    constructor(private http: HttpClient, private httpUtilService: HttpUtilService) {}

    placeOrder(orderData: OrderDTO): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.orderApi, orderData);
    }

    getOrderById(orderId: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.orderApi}/${orderId}`);
    }

    getOrderByKeyword(keyword: string, page: number, limit: number): Observable<ApiResponse> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('page', page.toString())
            .set('limit', limit.toString());

        const options = {
            headers: this.apiAuthConfig.headers,
            params: params
        };

        return this.http.get<ApiResponse>(`${this.orderApi}/get-orders-by-keyword`, options);
    }

    deleteOrderById(id: number): Observable<ApiResponse> {
        debugger;
        return this.http.delete<ApiResponse>(`${this.orderApi}/${id}`, this.apiAuthConfig);
    }

    updateOrder(id: number, orderData: OrderDTO): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${this.orderApi}/${id}`, orderData);
    }
}
