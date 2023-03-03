import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  constructor(private _employeeService:EmployeeService){}
  public employees : any;
  ngOnInit(){
    this._employeeService.getEmployees().subscribe(result => {
      this.employees = result;
    })
  }
}
