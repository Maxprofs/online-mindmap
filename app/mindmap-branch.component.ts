import { 
	Component,
	Input,
	ElementRef, 
	Renderer,
	ViewChild
} from '@angular/core';

import {MindMapNode} from './mindmap-node.class'

declare var $: any;

@Component({
	selector: 'mind-map-branch',
	template: `<canvas 
			class="canvas_branch"
			[style.width.px]="canvas_width"
			[style.height.px]="canvas_height"
			[style.top.px]="canvas_top"
			[style.left.px]="canvas_left" >
		</canvas>
	`
})
export class MindMapBranchComponent {
	canvas_width: number = 100;
	canvas_height: number = 100;
	canvas_top: number = 0;
	canvas_left: number = 0;
	@Input() node1: MindMapNode;
	@Input() node2: MindMapNode;
	
	constructor(public renderer: Renderer, public elementRef: ElementRef) {}

	ngDoCheck() {
		this.drawBranch();
	}

	private drawBranch() {
		let node1_element = $(".node#" + this.node1.id);
		let node2_element = $(".node#" + this.node2.id);

		let position1 = node1_element.position();
		let width1 = +node1_element.outerWidth(true);
		let height1 = +node1_element.outerHeight(true);

		let position2: any = node2_element.position();
		let width2 = +node2_element.outerWidth(true);
		let height2 = +node2_element.outerHeight(true);

		let a1 = [position1.left,position1.top+(height1/2)];
		let b1 = [position1.left+width1,position1.top+(height1/2)];

		let node1_parent = node1_element.offsetParent();
	
		let np = node2_element.offsetParent();
		while( np.get(0) != node1_parent.get(0) ) {
			let p = np.position();
			position2.top += p.top;
			position2.left += p.left;

			np =  np.offsetParent();
		}

		let a2 = [position2.left,position2.top+(height2/2)];
		let b2 = [position2.left+width2,position2.top+(height2/2)];
		
		let toRight = b1[0] < b2[0];
		this.canvas_width = toRight ? a2[0]-b1[0] : a1[0]-b2[0];
		this.canvas_height = a1[1] > a2[1] ? a1[1]-a2[1] : a2[1]-a1[1];
		this.canvas_top = a1[1] < a2[1] ? a1[1] : a2[1];
		this.canvas_left = toRight ? b1[0] : b2[0];
	}
}