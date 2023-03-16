import { Component, Output, EventEmitter } from '@angular/core';
import { JobService } from '../job.service';
import { environment } from 'src/environments/environment';
import { IJob } from '../job';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-employee-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
i: any;
  constructor(private _jobService: JobService, private filterService:FilterService){}
  joblist!:IJob[];
  rootsite = environment.apiUrl;
  //for showing company in details dialog-> needs to be passed from parent
  company!:string;
  notes!:string;

  //to show number of rows/company
  no_of_company!:number;

  //for showing and hiding tech keywords
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

  //Sending number of rows to parent component
  @Output() no_of_company_ItemEvent = new EventEmitter<number>();
  ngOnInit(){
    this._jobService.getJobs().subscribe(job => this.joblist = job);
    this.no_of_company=0;
    //for filtering date columns
    const customFilterName="date-filter";
    this.filterService.register(customFilterName, (value: any, filter: any):boolean => {
      if (filter == null || filter.length == 0){
        return true;
      }
      this.console.log(filter);
      return new Date(value.seconds * 1000).toLocaleDateString() === filter;
    })
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
  showDialog(company:string,url: string){
    this.company=company;
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
  onChangeFilter(event:any){
    //setTimeout is here for fixing the error - NG0100: Expression has changed after it was checked 
    setTimeout(() => {
      this.no_of_company_ItemEvent.emit(event.filteredValue.length);
    },0)
  }
  //custom sorting because regular sorting not working Note: maybe need to change something in th backend
  customSort(event:any){
    event.data.sort((data1:any, data2:any) => {
      let value1 = event.field === 'crawled_date' ? new Date(data1[event.field].seconds * 1000) :data1[event.field];
      let value2 = event.field === 'crawled_date' ? new Date(data2[event.field].seconds * 1000) :data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
      else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
  //For editing notes row
  onChangingNotes(href:string, $event: any){
    this.console.log($event);
    const url = this.rootsite + '/edit/notes?href=' + href + '&value=' +$event.target.value;
    this._jobService.sendNotes(url);
  }
}
