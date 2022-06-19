import { Candidate } from './../models/candidate-model';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    constructor(private http: HttpClient) {}

    APIUrl = environment.BASE_API_URL;

    getCandidateList(): Observable<Candidate[]> {
        return this.http.get<Candidate[]>(this.APIUrl + "/candidates");
    }
}