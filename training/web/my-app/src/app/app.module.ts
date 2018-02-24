import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import {AppRoutingModule}  from './app.routing';

import {TranslateModule, TranslateStaticLoader, TranslateLoader, TranslateService} from "ng2-translate";

import { AppComponent } from './app.component';

import {BootstrapComponent} from "./pages/bootstrap/bootstrap.component";
import {HomeComponent} from "./pages/home/home.component";

// import {DatetimerComponent} from "./pages/lazyload/datetimer/datetimer.component";
// import {ModalComponent} from "./pages/lazyload/modal/modal.component";


import {AccordionModule} from 'ng2-bootstrap/accordion';
import {AlertModule} from 'ng2-bootstrap';
import {TabsModule} from 'ng2-bootstrap';
import {ModalModule} from 'ng2-bootstrap';


import {UnitToInchPipe} from "./pages/lazyload/common/pipe/unit-toinch.pipe";
import {FocusOnInitDirective} from "./pages/lazyload/common/directive/focus-oninit-directive";

export function HttpLoaderFactory(http:Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent,
    // DatetimerComponent,
    // ModalComponent,
    HomeComponent,
    UnitToInchPipe,
    FocusOnInitDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [Http]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
