import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Crawl Jobs';
  public name = "property from parent component(App)";
  public message="";
  no_of_company:number =0;

  get_no_of_company(rowLength:number){
    this.no_of_company = rowLength;
  }
}
