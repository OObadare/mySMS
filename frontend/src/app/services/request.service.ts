import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RequestService {
    // env var for base url
    private url_base = environment.apiUrl
    constructor (private http: HttpClient) { };

    requestOptions = {
        headers: { 'Content-Type': 'application/json',
                   'Accept': 'application/json',
                    observe: 'response'
                }
    }
    

    public getData(url: string) {
        return this.http.get(`${this.url_base}/${url}`)
    }

    public deleteData(url: string) {
        return this.http.delete(`${this.url_base}/${url}`)
    }

    public postData(url: string, params: any) {
        return this.http.post(`${this.url_base}/${url}`, params, this.requestOptions)
    }
}