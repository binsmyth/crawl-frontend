import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { IJob } from './job';
import {catchError, map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }
  private _viewseekurl: string = environment.apiUrl + "/view";

  errorHandler(error:HttpErrorResponse, caught:Observable<any>){
    console.log(error.message, 'errorrr');
    return of();
  }

  getChart():Observable<IJob[]>{
    return this.http.get<IJob[]>(this._viewseekurl)
                    .pipe(map(res => res),catchError(this.errorHandler))
  }
}
