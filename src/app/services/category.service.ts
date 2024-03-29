import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { InsertCategoryDTO } from '../dtos/category/insert.category.dto';
import { HttpUtilService } from './http.util.service';
import { TokenService } from './token.service';
import { UpdateCategoryDTO } from '../dtos/category/update.category.dto';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiCategory = `${environment.apiBaseUrl}/categories`;
    private apiAuthConfig = {
        headers: this.httpUtilService.createHeaders('vi')
    };
    private token = this.tokenService.getToken();

    constructor(
        private http: HttpClient,
        private httpUtilService: HttpUtilService,
        private tokenService: TokenService
    ) {}

    getCategories(page: number, limit: number): Observable<Category[]> {
        const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
        return this.http.get<Category[]>(this.apiCategory, { params });
    }

    getDetailCategory(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.apiCategory}/${id}`);
    }

    insertCategory(insertCategoryDTO: InsertCategoryDTO): Observable<any> {
        return this.http.post(this.apiCategory, insertCategoryDTO, this.apiAuthConfig);
    }

    updateCategory(id: number, updateCategoryDTO: UpdateCategoryDTO) {
        return this.http.put(`${this.apiCategory}/${id}`, updateCategoryDTO, this.apiAuthConfig);
    }

    deleteCategory(id: number) {
        return this.http.delete(`${this.apiCategory}/${id}`, this.apiAuthConfig);
    }
}
