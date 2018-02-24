/**
 * Created by caip on 2017/8/21.
 */
import {Component, Input,Output, ViewChild, ElementRef, OnChanges,OnInit,Renderer,EventEmitter,forwardRef} from "@angular/core";
import {TranslateService} from "ng2-translate/ng2-translate";
import {ControlValueAccessor,NG_VALUE_ACCESSOR} from '@angular/forms';

declare var $: any;

//识别ControlValueAccessor 执行注册操作
export const DATE_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
};

/**
 HTML中使用案例  name是必填项
 readOnly="true"  只读属性
 value="2017-09-28"  初始化赋值
 [(ngModel)]  双向绑定值
 <!--单个日期-->
 <date-picker name="pickTime1" [singleDatePicker]="true" (onInputChanged)="onInputChanged($event)"></date-picker>
 <!--单个日期 带分秒时-->
 <date-picker name="pickTime2" [showTime]="true" [singleDatePicker]="true" (onInputChanged)="onInputChanged($event)"></date-picker>
 <!--起始结束日期 不带分秒时-->
 <date-picker name="pickTime3" (onInputChanged)="onInputChanged($event)"></date-picker>
 <!--起始结束日期 带分秒时-->
 <date-picker name="pickTime4" [showTime]="true"   (onInputChanged)="onInputChanged($event)"></date-picker>

 ts日期案例
 onInputChanged(value){
    console.log("选中的日期"+value);
 }
 */
@Component({
    selector: 'date-picker',
    template: `
            <div style="position: relative;">
                <input #dataInput type="text" class="form-control dateInput" [value]="_value" readonly/>
                <i style="position: absolute;top: 10px;right: 12px;cursor: pointer;color:#515151;"
                class="fa fa-calendar" (click)="showDate()"></i>
                <i style="position:absolute;top: 10px;right: 32px;cursor: pointer;color:#515151;"
                class="fa fa-remove" (click)="clearDate()"></i>
            </div>
        `,
    styles: [`
        .dateInput{background-color: #fff;color: #555;}
    `],
    providers: [DATE_PICKER_VALUE_ACCESSOR]
})


export class DatePickerComponent implements   OnInit,OnChanges,ControlValueAccessor{
    @ViewChild('dataInput') dataInput: ElementRef;

    @Input() singleDatePicker:boolean = false;

    @Input() showTime:boolean = false;

    @Output() onInputChanged = new EventEmitter<string>();

    _format:string ="YYYY-MM-DD";
    @Input() set format(format:string) {
        this._format=format;
    }

    _name:string = 'datepicker';
    @Input() set name(name:string) {
        this._name=(name&&name.trim())||'';
    }
    _value:string = '';
    /**
     * 日期input value值  可设置初始化值
     * @type {string}
     */
    @Input() set value(value:string) {
        this._value=value;
        this.onModelChange(this._value);
    }

    _readOnly:boolean =false;
    @Input() set readOnly(readOnly:boolean) {
        this._readOnly=readOnly
    }

    dataRageOption: Object = {
        "autoUpdateInput":false,
        "autoClose":true,
        "applyClass": "btn-primary",
        "opens": "left"
    };

    private todayStart:Date;
    private endStart:Date;

    constructor(public renderer: Renderer,private translate:TranslateService) {

    }
    ngOnInit(){
        if(this.showTime){
            this.dataRageOption["timePicker"]= true;
            this.dataRageOption["timePicker24Hour"]= true;
            this.dataRageOption["timePickerSeconds"]= true;
            this._format ="YYYY-MM-DD HH:mm:ss";
            this.dataRageOption["autoApply"]= false;
        }
        else{
            this.dataRageOption["autoApply"]= true;
        }
        this.dataRageOption["format"] = this._format;

        if(this.singleDatePicker){//单个日期
            this.dataRageOption["singleDatePicker"]= this.singleDatePicker;
            if(this._value)
                this.dataRageOption["startDate"]= new Date(this._value);
            else
                this.dataRageOption["startDate"] = new Date();
        }
        else{//多个日期
            if(this._value){
                let timeArr = this._value.split(" - ");
                if(timeArr.length==2){
                    this.dataRageOption["startDate"]= new Date(timeArr[0]);
                    this.dataRageOption["endDate"]=  new Date(timeArr[1]);
                }
            }
            else{
                this.setTodayStart();
                this.setTodayEnd();
                this.dataRageOption["startDate"]= this.todayStart;
                this.dataRageOption["endDate"]= this.endStart;
            }
        }

        if(!this._readOnly){
            this.showLang();
            this.translate.onLangChange.subscribe(date=>{
                this.showLang();
            });
        }
    }

    setTodayStart(){
        this.todayStart = new Date();
        this.todayStart.setHours(0);
        this.todayStart.setMinutes(0);
        this.todayStart.setSeconds(0);
    }

    setTodayEnd(){
        this.endStart = new Date();
        this.endStart.setHours(23);
        this.endStart.setMinutes(59);
        this.endStart.setSeconds(59);
    }

    ngOnChanges(){
        this.dataInput.nativeElement.name = this._name;
        if(this._readOnly){
            this.dataInput.nativeElement.readOnly = true;
        }
        if(this._value){
            this.setPickerValue();
            this.dataInput.nativeElement.value = this._value;
        }
    }
    onChanges(){
        this.setPickerValue();
        this.dataInput.nativeElement.value = this._value;
    }

    setPickerValue(){
        if(this.dataInput.nativeElement.value != this._value){
            if(this.singleDatePicker) {//单个日期
                if (this._value)
                    this.dataRageOption["startDate"] = new Date(this._value);
                else
                    this.dataRageOption["startDate"] = new Date();
            }
            else{//多个日期
                if(this._value){
                    let timeArr = this._value.split(" - ");
                    if(timeArr.length==2){
                        this.dataRageOption["startDate"]= new Date(timeArr[0]);
                        this.dataRageOption["endDate"]=  new Date(timeArr[1]);
                    }
                }
                else{
                    this.setTodayStart();
                    this.setTodayEnd();
                    this.dataRageOption["startDate"]= this.todayStart;
                    this.dataRageOption["endDate"]= this.endStart;
                }
            }
            this.dateRangePicker();
        }
    }

    /**
     * 设置菜单中英文
     */
    showLang(){
        if(this.translate.currentLang == "zh-cn"){
            this.dataRageOption["locale"] = {
                "separator": " - ",
                "daysOfWeek" : [ "日", "一", "二", "三", "四", "五", "六" ],
                "monthNames" : [ "一月", "二月", "三月", "四月", "五月", "六月",
                    "七月", "八月", "九月", "十月", "十一月", "十二月" ],
                "applyLabel" : "确定",
                "cancelLabel" : "取消"
            };
        }
        else{
            this.dataRageOption["locale"] = {
                "separator": " - ",
                "daysOfWeek": [ "Su","Mo","Tu","We","Th","Fr","Sa"],
                "monthNames": ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"],
                "applyLabel" : "comfirm",
                "cancelLabel" : "cancel"
            };
        }
        this.dateRangePicker();
    }

    dateRangePicker() {
        let picker: any = $("input[name='"+this._name+"']");
        let that =this;
        picker.daterangepicker(this.dataRageOption);
        picker.on('apply.daterangepicker', function(ev, picker) {
            if(that.singleDatePicker){
                that._value = picker.startDate.format(that._format);
                $(this).val(picker.startDate.format(that._format));
            }
            else{
                that._value  = picker.startDate.format(that._format)+" - "+picker.endDate.format(that._format);
                $(this).val(picker.startDate.format(that._format) + ' - ' + picker.endDate.format(that._format));
            }
            //将值传递到父界面
            that.onModelChange(that._value);
            that.onInputChanged.emit(that._value);
        });

        picker.on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
            that._value="";
            //将值传递到父界面
            that.onModelChange("");
            that.onInputChanged.emit("");
        });

    }

    showDate(){
        if(this._readOnly)
            return ;
        this.renderer.invokeElementMethod(this.dataInput.nativeElement, 'focus');
    }
    clearDate(){
        if(this._readOnly)
            return ;
        this._value = "";
        this.setPickerValue();
        this.onModelChange("");
        this.onInputChanged.emit("");
    }

    writeValue(value:string): void {
        if(typeof(value) !="undefined"){
            this._value = value;
            this.onChanges();
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(): void {
    }

    onModelChange : Function = (_: any) => { };

}