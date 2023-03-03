import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { environment } from 'src/environments/environment.development';
import { IEmployee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  constructor(private _employeeService: EmployeeService){}
  joblist!:IEmployee[];
  rootsite = environment.apiUrl + "/get/detail"
  first = 0;
  rows = 10;
  console = console;//accessing console in template
  ngOnInit(){
    this._employeeService.getEmployees().subscribe(job => this.joblist = job);
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
}
