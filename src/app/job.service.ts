import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { IJob } from './job';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private _viewseekurl: string = environment.apiUrl + "/view";
  constructor(private http: HttpClient) { }

  errorHandler(error:HttpErrorResponse, caught:Observable<any>){
    console.log(error.message, 'errorrr');
    return of();
  }
  getJobs():Observable<IJob[]>{
    return this.http.get<IJob[]>(this._viewseekurl)
                    .pipe(map(res => res),catchError(this.errorHandler))
  }
  getJobDetail(url: string){
    return this.http.get(url,{responseType: 'text'})
                    .pipe(map(res=>res),catchError(this.errorHandler))
  }
  getTechKeywords(url:string){
    return this.http.get(url,{responseType: 'text'})
                    .pipe(map(res=>res),catchError(this.errorHandler))
  }
  sendNotes(url:string){
    return this.http.get(url,{responseType:'text'}).subscribe(console.log);
  }
}
