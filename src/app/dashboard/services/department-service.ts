import { Department } from './../models/department-model';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    constructor(private http: HttpClient) {}

    formData: Department;

    APIUrl = environment.BASE_API_URL;

    getDeptList(): Observable<Department[]> {
        return this.http.get<Department[]>(this.APIUrl + "/departments");
    }

    addDepartment(dept: Department) {
        return this.http.post(this.APIUrl + '/department', dept)
    }

    updateDepartment(dept: Department) {
        return this.http.put(this.APIUrl + '/department/' + dept.id, dept)
    }

    deleteDepartment(id: string){
        return this.http.delete(this.APIUrl + "/department/" + id)
    }

    private _listeners = new Subject<any>();
    listen(): Observable<any> {
        return this._listeners.asObservable();
 
    }
    filter(filterBy: string){
        this._listeners.next(filterBy)
    }
}