import { 
	Pipe,
	Injectable,
	PipeTransform,
	Component,
	Directive, 
	Input,
	Output,
	HostListener, 
	ElementRef, 
	Renderer,
	EventEmitter
} from '@angular/core';

import { MindMap } from './model/mindmap.class'
import { MindMapNode, Side } from './model/mindmap-node.class'
import { MindMapService } from './services/mindmap.service'

@Directive({
	selector: 'mind-map-node input'
})
export class MindMapNodeInput {
	constructor(protected renderer: Renderer, protected elementRef: ElementRef) {}

	ngOnInit() {
		let natElem = this.elementRef.nativeElement;

    	this.renderer.invokeElementMethod(natElem, 'focus', []);
    	setTimeout( () => this.renderer.invokeElementMethod(natElem, 'setSelectionRange', [0,natElem.value.length]), 10 );
  	}
}

@Component({
	selector: 'mind-map-node',
	templateUrl: '/templates/mindmap-node.template.html',
	host: {'[class.selected-node]':'node.selected'}
})
export class MindMapNodeComponent {
	@Input() node: MindMapNode;
	mindMap: MindMap;

	@Output('editing')
	editingEmitter: EventEmitter<boolean> = new EventEmitter();

	edited_text: string = null;
	editing: boolean = false;

	show_buttons: boolean = false;
	checkSide: any = Side;

	constructor( protected mindMapService: MindMapService ) {
		this.mindMapService.getMindMap().then(mindMap => {this.mindMap = mindMap;});
	}

	// EDITING TEXT

	@HostListener('window:keyup.f2', ['$event'])
	onF2( e: Event) {
		if( !this.editing && this.node.selected ) {
			this.startEdit();
			e.stopImmediatePropagation();
			return false;
		}
	}

	@HostListener('window:keyup.escape',['$event'])
	escape(event: Event) {
		if( this.editing ){
			this.stopEdit();
			event.stopImmediatePropagation();
			return false;
		}
	}

	onInputBlur() {
		this.updateText();
	}

	onInputEnter() {
		this.updateText();
	}

	onInputClick() {
		this.mindMap.selectNode(this.node);
		this.startEdit();
	}

	startEdit() {
		if( this.node.selected ) {
			this.edited_text = this.node.text;
			this.setEditing(true);
		}
	}

	stopEdit() {
		this.setEditing(false);
	}

	updateText() {
		if( this.editing ) {
			this.node.text = this.edited_text;
			this.setEditing(false);
		}		
	}

	setEditing( ed: boolean ){
		this.editing = ed;
		this.onEditing(ed);
	}

	onEditing( ed: boolean ){
		this.editingEmitter.emit(ed);	
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

	sideRight(): boolean {
		return this.node.side == Side.None || this.node.side == Side.Right;
	}

	sideLeft(): boolean {
		return this.node.side == Side.None || this.node.side == Side.Left;
	}

	// Buttons actions

	addBefore() {
		this.mindMap.selectNode(this.node);
		this.mindMap.addBeforeSelected();
	}

	addAfter() {
		this.mindMap.selectNode(this.node);
		this.mindMap.addAfterSelected();
	}

	remove() {
		this.mindMap.selectNode(this.node);
		this.mindMap.removeSelected();
	}

	add() {
		this.mindMap.selectNode(this.node);
		this.mindMap.addToSelected();
	}

	addLeft() {
		this.mindMap.selectNode(this.node);
		this.mindMap.addLeftSelected();
	}

	addRight() {
		this.mindMap.selectNode(this.node);
		this.mindMap.addRightSelected();
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