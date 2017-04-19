import { Component, HostListener, ContentChildren } from '@angular/core';

import { MindMapService } from './mindmap.service'
import { MindMap } from './mindmap.class'
import { MindMapNode } from './mindmap-node.class'
import { MindMapNodeComponent } from './mindmap-node.component'

@Component({
	selector: 'mind-map',
	providers: [MindMapService],
	templateUrl: '/templates/mindmap.template.html'
})
export class MindMapComponent {
	
	mindMap: MindMap;
	editing: boolean = false;

	constructor( private mindMapService: MindMapService ) {};

	ngOnInit(): void {
		this.mindMapService.getMindMap().then( mindMap => { 
			this.mindMap = mindMap; 
		} );
	}

	onEditing( ed: boolean ){
		this.editing = ed;
	}

	@HostListener('window:keyup.control.arrowup',['$event'])
	onCtrlUp( e: Event)  {
		if( !this.editing && this.mindMap.selectedNode ) {
			this.mindMap.addBeforeSelected();
			e.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.control.arrowdown',['$event'])
	onCtrlDown( e: Event)  {
		if( !this.editing && this.mindMap.selectedNode ) {
			this.mindMap.addAfterSelected();
			e.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.control.enter',['$event'])
	onCtrlEnter( e: Event)  {
		if( !this.editing && this.mindMap.selectedNode ) {
			this.mindMap.addToSelected();
			e.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.control.arrowright',['$event'])
	onCtrlRight( e: Event)  {
		if( !this.editing && this.mindMap.selectedNode ) {
			this.mindMap.addRightSelected();
			e.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.control.arrowleft',['$event'])
	onCtrlLeft( e: Event)  {
		if( !this.editing && this.mindMap.selectedNode ) {
			this.mindMap.addLeftSelected();
			e.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.delete',['$event'])
	onDelete( e: Event)  {
		if( !this.editing && this.mindMap.selectedNode ) {
			this.mindMap.removeSelected();
			e.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.arrowup',['$event'])
	selectUp(event: Event) {
		if( event && this.mindMap.selectedNode && !this.editing ) {
			this.mindMap.selectUp();
			event.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.arrowdown',['$event'])
	selectDown(event: Event) {
		if( event && this.mindMap.selectedNode && !this.editing ) {
			this.mindMap.selectDown();
			event.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.arrowleft',['$event'])
	selectLeft(event: Event) {
		if( event && this.mindMap.selectedNode && !this.editing ){
			this.mindMap.selectLeft();
			event.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.arrowright',['$event'])
	selectRight(event: Event) {
		if( event && this.mindMap.selectedNode && !this.editing ){
			this.mindMap.selectRight();
			event.stopImmediatePropagation();
			return false;
		}
	}
}