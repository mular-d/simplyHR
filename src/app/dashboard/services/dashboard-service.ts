import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DashBoardService {
    constructor(private http: HttpClient) {}

    APIUrl = environment.BASE_API_URL;

    getData(): Observable<Array<number>[]> {
        return this.http.get<Array<number>[]>(this.APIUrl + "/companies");
    }

}