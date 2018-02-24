/**
 * Created by caip on 2017/10/30.
 */
import { Pipe, PipeTransform } from '@angular/core';

//unit METRIC:cm IMPERIAL:inch

@Pipe({name: 'unitToInch'})
export class UnitToInchPipe implements PipeTransform {
    transform(value: number, unit: string): number {
        if(unit == "METRIC"){
            return value;
        }
        else{
            if(value){
                let temp = this.conventCmToInch(value);
                return Number(temp);
            }
            else
                return value;
        }
    }

    conventCmToInch(len:number):string{
        let temp = 0.394*Number(len);
        return temp.toFixed(3);
    }
}
