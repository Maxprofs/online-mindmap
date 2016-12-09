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
	show_buttons: boolean = false;

	private updateText() {
		if( this.editing ) {
			this.node.text = this.edited_text;
			this.editing = false;
		}		
	}

	add() {
		if( this.node )
			this.node.add( new MindMapNode("New Node") );
	}

	addBefore() {
		if( this.node && this.node.parent )
			this.node.parent.addBefore( this.node, new MindMapNode("New Node") );
	}

	addAfter() {
		if( this.node && this.node.parent )
			this.node.parent.addAfter( this.node, new MindMapNode("New Node") );
	}

	remove() {
		if( this.node && this.node.parent )
			this.node.parent.remove( this.node );
	}

	showButtons() {
		this.show_buttons = true;
	}

	hideButtons() {
		this.show_buttons = false;
	}

	onInputClick() {
		if( this.node ) {
			this.edited_text = this.node.text;
			this.editing = true;
		}
	}

	@HostListener('keyup.up')
	onKeyUp() {
		this.addBefore();
	}

	@HostListener('keyup.down')
	onKeyDown() {
		this.addAfter()
	}

	onInputBlur() {
		this.updateText();
	}

	onInputEnter() {
		this.updateText();
	}
}