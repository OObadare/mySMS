import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RequestService {
    // env var for base url
    private url_base = "http://localhost:3000"
    constructor (private http: HttpClient) { };

    headers = { 'Content-Type': 'application/json'}

    getData(url: string) {
        return this.http.get(`${this.url_base}/${url}`, {observe: 'response'}).subscribe(res => {
            console.log(res)
        })
    }

    postData(url: string, params: any) {
        return this.http.post(`${this.url_base}/${url}`, params, {observe: 'response'}).subscribe(res => {
            console.log(res)
        });
    }
}