import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { HttpUtilService } from './http.util.service';
import { TokenService } from './token.service';
import { InsertProductDTO } from '../dtos/products/insert.product.dto';
import { UpdateProductDTO } from '../dtos/products/update.product.dto';
import { ApiResponse } from '../response/api.response';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiProduct = `${environment.apiBaseUrl}/products`;
    private apiConfig = {
        headers: this.httpUtilService.createHeaders('vi')
    };

    constructor(private http: HttpClient, private httpUtilService: HttpUtilService) {}

    getProducts(keyword: string, categoryId: number, page: number, limit: number): Observable<ApiResponse> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('category_id', categoryId.toString())
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<ApiResponse>(this.apiProduct, { params });
    }

    getDetailProducts(productId: number) {
        return this.http.get<ApiResponse>(`${this.apiProduct}/${productId}`);
    }

    getProductByIds(productIds: number[]): Observable<ApiResponse> {
        const ids = productIds.join(',');
        const params = new HttpParams().set('ids', ids);
        return this.http.get<ApiResponse>(`${this.apiProduct}/by-ids`, { params });
    }

    insertProduct(insertProductDTO: InsertProductDTO) {
        return this.http.post<ApiResponse>(this.apiProduct, insertProductDTO, this.apiConfig);
    }

    updateProduct(productId: number, updateProductDTO: UpdateProductDTO): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${this.apiProduct}/${productId}`, updateProductDTO);
    }

    uploadImage(productId: number, images: File[]): Observable<ApiResponse> {
        debugger;
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('files', images[i]);
        }
        const newHeader = {
            headers: this.httpUtilService.createHeaders('vi')
        };
        return this.http.post<ApiResponse>(
            `${environment.apiBaseUrl}/product-images/uploads/${productId}`,
            formData,
            newHeader
        );
    }

    deleteProductById(productId: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiProduct}/${productId}`, this.apiConfig);
    }

    deleteProductImage(productImageId: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${environment.apiBaseUrl}/product-images/${productImageId}`);
    }
}
