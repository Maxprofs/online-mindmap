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

	@HostListener('blur')
	onBlur() {
		this.renderer.invokeElementMethod(
			this.elementRef.nativeElement, 
        	'dispatchEvent', 
        	[new CustomEvent('input-blur', { bubbles: true })]);
	};
}

@Component({
	selector: 'mind-map-node',
	templateUrl: '/templates/mindmapnode.template.html'
})
export class MindMapNodeComponent {
	@Input() node: MindMapNode;
	
	edited_text: string;
	editing: boolean = false

	onInputClick() {
		if( this.node ) {
			this.edited_text = this.node.text;
			this.editing = true;
		}
	}

	@HostListener('input-blur')
	onInputBlur() {
		if( this.editing ) {
			this.node.text = this.edited_text;
			this.editing = false;
		}		
	}

	onAddButtonClick() {
		this.node.add( new MindMapNode("New Node") );
	}
}