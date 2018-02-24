import {NgModule} from '@angular/core';
import {
    Routes,
    RouterModule
}             from '@angular/router';

import {BootstrapComponent} from "./pages/bootstrap/bootstrap.component";

import {HomeComponent} from "./pages/home/home.component";


import {AppComponent} from "./app.component";

import {DatetimerComponent} from "./pages/lazyload/datetimer/datetimer.component";
import {ModalComponent} from "./pages/lazyload/modal/modal.component";

export const routes:Routes =[
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: 'bootstrap',
        component: BootstrapComponent
    },
    {
        path: 'lazyload',
        component: HomeComponent,
        children:[
            {
                path:'datetimer',
                loadChildren: 'app/pages/lazyload/module/datetimer/app.datetimermodule#DateTimerModule'
            },
            {
                path:'modal',
                loadChildren: 'app/pages/lazyload/module/modal/app.modalmodule#MyModalModule'
            }
           /*  {
                path: 'lazyload/datetimer',
                component: DatetimerComponent
            },
            {
                path: 'lazyload/modal',
                component: ModalComponent
            }  */
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

