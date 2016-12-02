import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OmmComponent }  from './omm.component';

@NgModule({
	imports:      [ BrowserModule ],
	declarations: [ OmmComponent ],
	bootstrap:    [ OmmComponent ]
})
export class OmmModule { }