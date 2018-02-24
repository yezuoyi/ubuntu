/**
 * Created by caip on 2017/10/30.
 */
import { Pipe, PipeTransform } from '@angular/core';

//unit METRIC:cm3 IMPERIAL:inch3

@Pipe({name: 'unitToVol'})
export class UnitToVolPipe implements PipeTransform {
    transform(value: number, unit: string): number {
        if(unit == "METRIC"){
            return value;
        }
        else{
            if(value){
                let temp = this.conventCm3toInch3(value);
                return Number(temp);
            }
            else
                return value;
        }
    }

    conventCm3toInch3(vol):string{
        let temp = 0.0610 * Number(vol);
        return temp.toFixed(3);
    }
}
