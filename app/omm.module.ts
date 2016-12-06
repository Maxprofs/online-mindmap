import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OmmComponent }  from './omm.component';
import { MainMenuComponent } from './main-menu.component';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [ 
		OmmComponent,
		MainMenuComponent
	],
	bootstrap:    [ OmmComponent ]
})

export class OmmModule { }