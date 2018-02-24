import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'bootstrap',
	templateUrl: 'bootstrap.component.html'
})

export class BootstrapComponent implements OnInit {

	ngOnInit() { }

	selectTabA(){
		console.log("select tab A");
	}
	
	selectInput($event){
		console.log("select Input");
		$event.stopPropagation();//阻止冒泡
	}

	model1: any;
    arrayOfStrings: string[] =
      ["this", "is", "array", "of", "text"];
}