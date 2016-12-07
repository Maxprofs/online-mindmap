import { 
	Component,
	Directive, 
	Input, 
	HostListener, 
	ElementRef, 
	Renderer
} from '@angular/core';

import { MindMapNode } from './mindmapnode.class'

@Directive({
	selector: 'mind-map-node input'
})
export class MindMapNodeInput {
	constructor(public renderer: Renderer, public elementRef: ElementRef) {}

	ngOnInit() {
    	this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
  	}
}

@Component({
	selector: 'mind-map-node',
	templateUrl: '/templates/mindmapnode.template.html'
})
export class MindMapNodeComponent {
	@Input() node: MindMapNode;
	
	edited_text: string;
	editing: boolean = false

	updateText() {
		if( this.editing ) {
			this.node.text = this.edited_text;
			this.editing = false;
		}		
	}

	onInputClick() {
		if( this.node ) {
			this.edited_text = this.node.text;
			this.editing = true;
		}
	}

	onInputBlur() {
		this.updateText();
	}

	onInputEnter() {
		this.updateText();
	}

	onAddButtonClick() {
		if( this.node )
			this.node.add( new MindMapNode("New Node") );
	}

	onAddSiblingButtonClick() {
		if( this.node && this.node.parent )
			this.node.parent.addBefore( this.node, new MindMapNode("New Node") );
	}

	onRemoveButtonClick() {
		if( this.node && this.node.parent )
			this.node.parent.remove( this.node );
	}
}