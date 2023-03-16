import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  data: any;
  
  constructor(private _chartService: ChartService) {}

  ngOnInit(){
    this._chartService
      .getChart()
      .pipe(
        map(jobs => 
          jobs.reduce((acc:any, value) => {
            const seconds = new Date(value.crawled_date.seconds * 1000).toDateString();
            const count = (acc[seconds] !== undefined) ? acc[seconds] + 1 : 1;
            acc[seconds] = count;
            return acc;
          }, {})
        ),
        map(counts =>{
          return{
            labels:Object.keys(counts),
            datasets:[{label:"Jobs Found",data:Object.values(counts)}]
          }
        })
      )
      .subscribe(data => this.data = data);
  }
}


