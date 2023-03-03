import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { IEmployee } from './employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _url: string = "http://localhost:5002/view/seek";
  constructor(private http: HttpClient) { }

  errorHandler(error:HttpErrorResponse, caught:Observable<any>){
    console.log(error.message, 'errorrr');
    return of();
  }
  getEmployees():Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url)
                    .pipe(map(res => res),catchError(this.errorHandler))
  }
}
