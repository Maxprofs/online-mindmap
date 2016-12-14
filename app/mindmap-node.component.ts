import { 
	Pipe,
	Injectable,
	PipeTransform,
	Component,
	Directive, 
	Input, 
	HostListener, 
	ElementRef, 
	Renderer
} from '@angular/core';

import { MindMap } from './mindmap.class'
import { MindMapNode, Side } from './mindmap-node.class'

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
	templateUrl: '/templates/mindmap-node.template.html'
})
export class MindMapNodeComponent {
	@Input() node: MindMapNode;
	
	edited_text: string;
	editing: boolean = false
	show_buttons: boolean = false;
//	show_buttons: boolean = true;
	checkSide: any = Side;

	constructor(public renderer: Renderer, public elementRef: ElementRef) {}

	private updateText() {
		if( this.editing ) {
			this.node.text = this.edited_text;
			this.editing = false;
		}		
	}

	add() {
		if( this.node )
			this.node.add( new MindMapNode("New Node",this.node.side) );
	}

	addBefore() {
		if( this.node && !this.isRoot() )
			this.node.parent.addBefore( this.node, new MindMapNode("New Node") );
	}

	addAfter() {
		if( this.node && !this.isRoot() )
			this.node.parent.addAfter( this.node, new MindMapNode("New Node") );
	}


	addLeft(): void {
		if( this.node && this.isRoot() ) {
			(this.node as MindMap).addLeft( new MindMapNode("New Node") );
		}
	}

	addRight(): void {
		if( this.node && this.isRoot() )
			(this.node as MindMap).addRight( new MindMapNode("New Node") );
	}

	remove() {
		if( this.node && !this.isRoot() )
			this.node.parent.remove( this.node );
	}

	showButtons() {
		this.show_buttons = true;
	}

	hideButtons() {
		this.show_buttons = false;
	}

	isRoot(): boolean {
		return !this.node.parent;
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

@Pipe({
    name: 'sideFilter',
    pure: false
})
@Injectable()
export class SideFilterPipe implements PipeTransform {
    transform(nodes: MindMapNode[], side: Side): any {
        return nodes.filter(node => node.side == side);
    }
}