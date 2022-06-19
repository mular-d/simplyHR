import { Department } from './../models/department-model';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    constructor(private http: HttpClient) {}

    APIUrl = environment.BASE_API_URL;

    getDeptList(): Observable<Department[]> {
        return this.http.get<Department[]>(this.APIUrl + "/departments");
    }
}