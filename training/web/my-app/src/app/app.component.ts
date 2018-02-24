import { Component,OnInit } from '@angular/core';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  
  constructor() {}


  private title:string = "angualr";
  private sex:number = 0;
  private hobby:number =0;

  
  private projectArray:any =[
    {id:0,name:"wms"},
    {id:1,name:"oms"},
  ];
  private projectKey:number;


  ngOnInit() { 
    this.projectKey = 1;
  }


  changeSex(value){
    this.sex = value;
  }
}
