import {NgModule}                 from '@angular/core';

import {Routes,RouterModule} from '@angular/router';
import {ModalComponent} from "../../modal/modal.component";


const modalroutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ModalComponent,
                data: {
                    title: '模态框'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(modalroutes)],
    exports: [RouterModule]
})
export class ModalRoutingModule {
}

