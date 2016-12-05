import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { OmmComponent }  from './omm.component';
import { MindMapComponent }  from './mindmap.component';
import { MindMapNodeComponent }  from './mindmapnode.component';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [ 
		OmmComponent,
		MindMapComponent,
		MindMapNodeComponent
	],
//	providers: [
//	],
	bootstrap: [
		OmmComponent
	]
})
export class OmmModule { }