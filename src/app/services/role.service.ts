import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private apiGetRoles = `${environment.apiBaseUrl}/roles`;

    constructor(private http: HttpClient) {}

    getRoles(): Observable<any[]> {
        return this.http.get<any[]>(this.apiGetRoles);
    }
}
