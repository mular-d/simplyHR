import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Job } from "../models/job-model";

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private http: HttpClient) {}

    APIUrl = environment.BASE_API_URL;

    getJobsList(): Observable<Job[]> {
        return this.http.get<Job[]>(this.APIUrl + "/jobs");
    }
}