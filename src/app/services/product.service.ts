import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "../models/product";
import { HttpUtilService } from "./http.util.service";


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiProduct = `${environment.apiBaseUrl}/products`;

    constructor(
        private http: HttpClient,
        private httpUtilService: HttpUtilService
    ) {
        
    }

    getProducts(keyword: string, categoryId: number,page: number, limit: number):Observable<Product[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('category_id', categoryId.toString())
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiProduct, {params});
    }

    getDetailProducts(productId: number) {
        return this.http.get<Product>(`${this.apiProduct}/${productId}`);
    }

    getProductByIds(productIds: number[]): Observable<Product[]> {
        const ids = productIds.join(',');
        const params = new HttpParams()
            .set('ids', ids);
        return this.http.get<Product[]>(`${this.apiProduct}/by-ids`, {params});
    }
}