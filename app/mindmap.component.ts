import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { MindMapService } from './mindmap.service'
import { MindMap } from './mindmap.class'
import { MindMapNode } from './mindmap-node.class'

@Component({
	selector: 'mind-map',
	providers: [MindMapService],
	templateUrl: '/templates/mindmap.template.html'
})

export class MindMapComponent implements OnInit {
	mindMap: MindMap;
	selected: MindMapNode;

	constructor( private mindMapService: MindMapService ) {};

	ngOnInit(): void {
		this.mindMapService.getMindMap().then( mindMap => { 
			this.mindMap = mindMap; 
			this.selected = mindMap;
		} );
	}
}