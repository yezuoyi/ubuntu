import {NgModule}                 from '@angular/core';

import {Routes,RouterModule} from '@angular/router';

import {DatetimerComponent} from "../../datetimer/datetimer.component";


const datetimerroutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DatetimerComponent,
                data: {
                    title: '日期控件'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(datetimerroutes)],
    exports: [RouterModule]
})
export class DateTimerRoutingModule {
}

