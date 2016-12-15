/// <reference path="jquery.d.ts" />

import { 
	Component,
	Input,
	ElementRef, 
	Renderer,
	ViewChild
} from '@angular/core';

import {MindMapNode} from './mindmap-node.class'
import {ElementSizes} from './element-sizes.class'

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

		let sizes1 = new ElementSizes(node1_element);
		let sizes2 = new ElementSizes(node2_element,node1_element.offsetParent());

		let l1 = sizes1.mediumLeft(false);
		let r1 = sizes1.mediumRight(false);

		let l2 = sizes2.mediumLeft(false);
		let r2 = sizes2.mediumRight(false);;
		
		let toRight = r1[0] < r2[0];
		this.canvas_width = toRight ? l2[0]-r1[0] : l1[0]-r2[0];
		this.canvas_height = l1[1] > l2[1] ? l1[1]-l2[1] : l2[1]-l1[1];
		this.canvas_top = l1[1] < l2[1] ? l1[1] : l2[1];
		this.canvas_left = toRight ? r1[0] : r2[0];
	}
}