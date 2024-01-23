import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { HttpUtilService } from './http.util.service';
import { TokenService } from './token.service';
import { InsertProductDTO } from '../dtos/products/insert.product.dto';
import { UpdateProductDTO } from '../dtos/products/update.product.dto';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiProduct = `${environment.apiBaseUrl}/products`;
    private apiConfig = {
        headers: this.httpUtilService.createHeaders('vi')
    };

    constructor(private http: HttpClient, private httpUtilService: HttpUtilService) {}

    getProducts(keyword: string, categoryId: number, page: number, limit: number): Observable<Product[]> {
        const params = new HttpParams()
            .set('keyword', keyword)
            .set('category_id', categoryId.toString())
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<Product[]>(this.apiProduct, { params });
    }

    getDetailProducts(productId: number) {
        return this.http.get<Product>(`${this.apiProduct}/${productId}`);
    }

    getProductByIds(productIds: number[]): Observable<Product[]> {
        const ids = productIds.join(',');
        const params = new HttpParams().set('ids', ids);
        return this.http.get<Product[]>(`${this.apiProduct}/by-ids`, { params });
    }

    insertProduct(insertProductDTO: InsertProductDTO) {
        return this.http.post(this.apiProduct, insertProductDTO, this.apiConfig);
    }

    updateProduct(productId: number, updateProductDTO: UpdateProductDTO): Observable<UpdateProductDTO> {
        return this.http.put<Product>(`${this.apiProduct}/${productId}`, updateProductDTO);
    }

    uploadImage(productId: number, images: File[]): Observable<any> {
        debugger;
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('files', images[i]);
        }
        const newHeader = {
            headers: this.httpUtilService.createHeaders('vi')
        };
        return this.http.post(`${environment.apiBaseUrl}/product_images/uploads/${productId}`, formData, newHeader);
    }

    deleteProductById(productId: number) {
        return this.http.delete(`${this.apiProduct}/${productId}`, this.apiConfig);
    }

    deleteProductImage(productImageId: number): Observable<any> {
        return this.http.delete<string>(`${environment.apiBaseUrl}/product_images/${productImageId}`);
    }
}
