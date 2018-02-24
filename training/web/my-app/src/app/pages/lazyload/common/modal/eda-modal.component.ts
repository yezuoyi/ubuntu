/**
 * Created by caip on 2017/11/9.
 */
import {Component, Input,Output,ViewChild,OnInit,EventEmitter} from "@angular/core";
import {ModalDirective} from 'ng2-bootstrap';

@Component({
    selector: 'eda-modal',
    templateUrl: 'eda-modal.component.html',
    providers: []
})

export class EdaModalComponent implements OnInit{
    constructor() {
    }

    @ViewChild(ModalDirective) public edaModal: ModalDirective;

    //设置模态框宽度   默认可不填
    @Input() width:number;

    //设置模态框宽度   默认可不填
    @Input() height:number;

    //设置模态框显示位置   默认可不填
    @Input() top:number;

    //是否显示右上角关闭按钮
    @Input() showCloseBtn:boolean =true;

    //标题
    @Input() title:string;

    //确定按钮 无定义时，按钮不呈现
    // 方便带入国际化名称
    @Input() confirmName:string;

    //取消或关闭按钮名称  无定义时，按钮不呈现
    // 方便带入国际化名称
    @Input() cancelName:string;

    //点击确认后触发事件到父组件
    @Output() confirmEmitter = new EventEmitter();

    ngOnInit() {
    }

    show(){
        this.edaModal.show();
    }
    hide(){
        this.edaModal.hide();
    }

    confirm(){
        this.confirmEmitter.emit();
    }
}
