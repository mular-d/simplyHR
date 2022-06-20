import { Department } from './../models/department-model';
import { Employee } from './../models/employee-model';
import { environment } from './../../../environments/environment';

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) {}

    formData: Employee

    APIUrl = environment.BASE_API_URL;

    getEmployeesList(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.APIUrl + "/employees");
    }

    getDeptDropDown(): Observable<any> {
        return this.http.get<Department[]>(this.APIUrl + "/departments")
    }

    addEmployee(emp: Employee) {
        return this.http.post(this.APIUrl + '/employee', emp)
    }

    updateEmployee(emp: Employee) {
        return this.http.put(this.APIUrl + '/employee/' + emp.id, emp)
    }

    deleteEmployee(id: string){
        return this.http.delete(this.APIUrl + "/employee/" + id)
    }

    private _listeners = new Subject<any>();
    listen(): Observable<any> {
        return this._listeners.asObservable();
 
    }
    filter(filterBy: string){
        this._listeners.next(filterBy)
    }
}