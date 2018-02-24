import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'modal',
	templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnInit {
	constructor() { }

	ngOnInit() {
	}

	//显示模态框
	showModal(modal){
		modal.show();
	}

	confirmEmitter(modal){
		//业务逻辑处理
		// ...
		//关闭模态框
		modal.hide();
	}
}