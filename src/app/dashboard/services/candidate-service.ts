import { Job } from './../models/job-model';
import { Candidate } from './../models/candidate-model';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    constructor(private http: HttpClient) {}

    formData: Candidate

    APIUrl = environment.BASE_API_URL;

    getCandidateList(): Observable<Candidate[]> {
        return this.http.get<Candidate[]>(this.APIUrl + "/candidates");
    }

    getJobDropDown(): Observable<any> {
        return this.http.get<Job[]>(this.APIUrl + '/jobs')
    }

    addCandidate(candidate: Candidate) {
        return this.http.post(this.APIUrl + '/candidate', candidate)
    }

    removeCandidate(id: string) {
        return this.http.delete(this.APIUrl + '/candidate/' + id)
    }

    // To refresh the table after altering data
    private _listeners = new Subject<any>();
    listen(): Observable<any> {
        return this._listeners.asObservable();
 
    }
    filter(filterBy: string){
        this._listeners.next(filterBy)
    }
}