import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'datetimer',
	templateUrl: 'datetimer.component.html'
})

export class DatetimerComponent implements OnInit {

	ngOnInit() { }

	onInputChanged(value){
        console.log("修改后的日期"+value);
    }
    
}