import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }	 from '@angular/forms';

import { OmmComponent }  from './omm.component';
import { MainMenuComponent } from './main-menu.component';
import { MindMapComponent }  from './mindmap.component';
import { MindMapNodeComponent, MindMapNodeInput, SideFilterPipe }  from './mindmap-node.component';
import { MindMapBranchComponent } from './mindmap-branch.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [ 
		OmmComponent,
		MainMenuComponent,
		MindMapComponent,
		MindMapNodeComponent,
		MindMapBranchComponent,
		MindMapNodeInput,
		SideFilterPipe
	],
//	providers: [
//	],
	bootstrap: [
		OmmComponent
	]
})

export class OmmModule { }