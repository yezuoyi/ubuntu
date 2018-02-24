import { NgModule }       from '@angular/core';

import {ModalComponent} from "../../modal/modal.component";

import {ModalRoutingModule}  from "./app.modalrouting";

// import {SharedModule}  from "../common/app.sharemodule";

import { CommonModule }        from '@angular/common';
import {ModalModule} from 'ng2-bootstrap';
import {EdaModalComponent} from "../../common/modal/eda-modal.component";

@NgModule({
    imports: [
        ModalRoutingModule,
        CommonModule,
        ModalModule
    ],
    declarations: [
        ModalComponent,
        EdaModalComponent
    ]
})
export class MyModalModule {}