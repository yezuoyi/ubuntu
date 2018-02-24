/**
 * Created by caip on 2017/10/30.
 */
import { Pipe, PipeTransform } from '@angular/core';

//unit METRIC:kg IMPERIAL:lb

@Pipe({name: 'unitToLb'})
export class UnitToLbPipe implements PipeTransform {
    transform(value: number, unit: string): number {
        if(unit == "METRIC"){
            return value;
        }
        else{
            if(value){
                let temp = this.conventKgtoLb(value);
                return Number(temp);
            }
            else
                return value;
        }
    }

    conventKgtoLb(weight):string{
        let temp = 2.205*Number(weight);
        return temp.toFixed(3);
    }
}
