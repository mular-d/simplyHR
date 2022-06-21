import { Department } from './../models/department-model';
import { environment } from './../../../environments/environment';
import { Job } from "../models/job-model";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private http: HttpClient) {}

    formData: Job

    APIUrl = environment.BASE_API_URL;

    getJobsList(): Observable<Job[]> {
        return this.http.get<Job[]>(this.APIUrl + "/jobs");
    }

    getSingleJob(id: string) {
        return this.http.get<Job>(this.APIUrl + '/job/' + id)
    }

    getDeptDropDown(): Observable<any> {
        return this.http.get<Department[]>(this.APIUrl + "/departments")
    }

    addJob(job: Job){
        return this.http.post(this.APIUrl + '/job/', job)
    }

    updateJob(job: Job) {
        return this.http.put(this.APIUrl + '/job/' + job.id, job)
    }

    removeJob(id: string) {
        return this.http.delete(this.APIUrl + '/job/' + id)
    }

    private _listeners = new Subject<any>();
    listen(): Observable<any> {
        return this._listeners.asObservable();
 
    }
    filter(filterBy: string){
        this._listeners.next(filterBy)
    }
}