import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { environment } from 'src/environments/environment.development';
import { IJob } from '../job';

@Component({
  selector: 'app-employee-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
i: any;
  constructor(private _jobService: JobService){}
  joblist!:IJob[];
  rootsite = environment.apiUrl + "/view/detail"
  keywords:any = {}; // I don't understand how come this works.
  showKeyword!:boolean;
  tab1:boolean[] =[];
  tab2:boolean[]=[];

  //For tables
  first = 0;
  rows = 10;
  display:boolean = false;
  //For showing details of each job
  description:any;
  environment = environment; // sharing environment variable to template files
  console = console; // for debuggin in template
  ngOnInit(){
    this._jobService.getJobs().subscribe(job => this.joblist = job);
  }
  next(){
    this.first = this.first + this.rows;
  }
  prev(){
    this.first = this.first - this.rows;
  }
  reset(){
    this.first=0;
  }
  isLastPage():boolean{
    return this.joblist ? this.first === (this.joblist.length - this.rows): true;
  }
  isFirstPage():boolean{
    return this.joblist ? this.first === 0 : true;
  }
  showDialog(url: string){
    this._jobService.getJobDetail(url).subscribe(description => this.description = description);
    this.display = true;  
  }
  showKeywords(index:number, url:string){
    this.tab1[index] = true;
    this._jobService.getTechKeywords(url).subscribe((keywords) => {
      this.keywords[index] = JSON.parse(keywords).filter((value:any,index:any,array:any)=>array.indexOf(value) === index);
      this.showKeyword = true;
    });
  }
}
