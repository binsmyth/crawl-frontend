import { Component, EventEmitter, Input, Output } from '@angular/core';
import { bufferToggle } from 'rxjs';

@Component({
  selector: 'app-test',
  template: `
  <div>
    <div>
      {{greetUser()}}
    </div>
    <div><input bind-disabled="isDisabled" type="text" value="Vineet"></div>
    <div>
      <h1>#Class binding</h1>
      <h2 [class]="successClass">Learning Angular</h2>
      <h2 [class.text-danger]="hasError">Crawl danger </h2>
      <h2 [ngClass]="messageClasses">Crawl class binding with ngclass directive</h2>
    </div>
    <div>
      <h1>#Style binding</h1>
      <h2 [style.color]= "hasError ? 'red' : 'orange'">style binding with conditionals</h2>
      <h2 [style.color]="highlightColor">Style during binding</h2>
      <h2 [ngStyle]="titleStyles">style with ngstyle directive</h2>
    </div>
    <div>
      <h1>#Event binding</h1>
      <button (click)="onClick($event)">Greet</button>
      {{Greeting}}
    </div>
    <div>
      <h1>#Template Reference Variables</h1>
      <input #myInput type="text">
      <button (click)="logMessage(myInput)">Log</button>
    </div>
    <div>
      <h1>#Two way binding</h1>
      <input [(ngModel)]="name" type="text">
      {{name}}
    </div>
    <div>
      <h1>#ngif directive</h1>
      <p>##ngif with inline directive</p>
      <h2 *ngIf="ngIfProp; else elseBlock">ngif because ngifprop is set to true</h2>
      <ng-template #elseBlock>
        <h2>ngif hidden because ngifprops is set to false</h2>
      </ng-template>
      <p>##ngif with separate directive</p>
      <div *ngIf="ngIfProp; then thenBlock; else elseBlock"></div>
      <ng-template #thenBlock>
        <h2>this is if block because ngifprop is set to true</h2>
      </ng-template>
      <ng-template #elseBlock>
        <h2>this is else block which should be hidden because ngifprop is set to false</h2>
      </ng-template>
    </div>
    <div>
      <h1>#ngSwitch Case Directive</h1>
      <div [ngSwitch]="color">
        <div *ngSwitchCase="'red'">You picked red color</div>
        <div *ngSwitchCase="'blue'">You picked blue color</div>
        <div *ngSwitchDefault>pick again</div>
      </div>
    </div>
    <div>
      <h1>#ngFor Directive</h1>
      <div *ngFor="let color of colors; index as i; first as f; even as e">
        <h2>{{"index = " + i}} {{"isFirst = " + f}} {{"isEven = " + e}} {{"color = " + color}}</h2>
      </div>
    </div>
    <div>
      <h1>#Component Interaction</h1>
      <div>
        ##Parent to child interaction
        <h2>{{"Hello, " + parentData }}</h2>
      </div>
      <div>
        ##Child to Parent interaction
        <button (click)="fireEvent()">Send event from child to parent</button>
      </div>
    </div>
    <div>
      <h1>#Pipes</h1>
      <h2>{{5.678 | number:'1.1-1'}}</h2>
      <h2>{{person | json}}</h2>
    </div>
  </div>
  `,
  styles: [`
    .text-success{
      color:green;
    }
    .text-danger{
      color:red;
    }
    .text-special{
      font-style: italic;
    }
    div{
      border:1px solid black;
      padding:5rem 5rem 5rem 5rem;
    }
  `]
})
export class TestComponent {
  public name ="vineet";
  public isDisabled = true;
  public successClass = "text-success";
  public hasError=false;
  public isSpecial = true;
  public highlightColor = "orange";
  public Greeting = "";//text property when button clicked
  public ngIfProp = true;
  public color="orange";
  public colors=['red', 'blue', 'green'];//ngFor directive array to use
  @Input() public parentData : any; // Using other variable names, @Input(parentData) public name
  @Output() public childEvent = new EventEmitter();
  public person={
    "firstname" : "John",
    "lastname" : "Reed"
  };

  public titleStyles={
    color:"blue",
    fontStyle:"italic"
  }
  public messageClasses={
    "text-success" : !this.hasError,
    "text-danger" : this.hasError,
    "text-special" : this.isSpecial
  }
  greetUser(){
    return "Hello " + this.name;
  }
  onClick(event : Event){
    this.Greeting = "Welcome to crawljobs";//set the text property to be showed when button is clicked
    console.log(event);
  }
  fireEvent(){
    this.childEvent.emit('Hey child sending data');
  }
  logMessage(myInput : HTMLInputElement){
    console.log("my input is ", myInput);
  }
}
