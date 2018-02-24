import { NgModule }       from '@angular/core';

import {DatetimerComponent} from "../../datetimer/datetimer.component";

import {DateTimerRoutingModule}  from "./app.datetimerrouting";

// import {DatePickerComponent} from "../../common/datepicker/datepicker.component";

import {SharedModule}  from "../common/app.sharemodule";

@NgModule({
    imports: [
        DateTimerRoutingModule,
        SharedModule
    ],
    declarations: [
        DatetimerComponent
    ]
})
export class DateTimerModule {}