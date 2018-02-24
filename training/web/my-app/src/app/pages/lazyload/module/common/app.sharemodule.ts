import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import {ModalModule} from 'ng2-bootstrap';

import {DatePickerComponent} from "../../common/datepicker/datepicker.component";
import {EdaModalComponent} from "../../common/modal/eda-modal.component";

@NgModule({
    imports:      [CommonModule,FormsModule,ModalModule],
    declarations: [DatePickerComponent,EdaModalComponent],
    exports:      [CommonModule, FormsModule,DatePickerComponent,EdaModalComponent]
})
export class SharedModule { }
