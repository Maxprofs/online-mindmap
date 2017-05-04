import { Component } from '@angular/core';

import { MindMapRef, MindMapService } from './services/mindmap.service'

export class Side {
	id: number;
	name: string;
}

const SIDES: Side[] = [
	{ id: 0, name: 'left' },
	{ id: 1, name: 'right' },
	{ id: 2, name: 'top' },
	{ id: 3, name: 'botton' },
];

@Component({
  selector: 'main-menu',
  templateUrl: '/templates/main-menu.template.html'
})
export class MainMenuComponent  {

	constructor( private mindMapService: MindMapService ) {
		mindMapService.getMindMapsListObservable().subscribe((list)=>this.mapsList = list)
	}

	mapsList: MindMapRef[];
	side: Side = SIDES[0];
	open: boolean = false;

	openMenu(): void {
		this.open = true;
	}

	closeMenu(): void {
		this.open = false;
	}

	switchMenu(): void {
		this.open = !this.open;
	}

	load( id: string ) {
		this.mindMapService.loadMindMap( id );
	}

	save() {
		this.mindMapService.saveMindMap();
	}
}