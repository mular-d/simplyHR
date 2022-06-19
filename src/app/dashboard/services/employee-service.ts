import { Employee } from './../models/employee-model';
import { environment } from './../../../environments/environment';

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) {}

    APIUrl = environment.BASE_API_URL;

    getEmployeesList(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.APIUrl + "/employees");
    }
}