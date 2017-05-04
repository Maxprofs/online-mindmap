/// <reference path="utils/jquery.d.ts" />

import { 
	Component,
	Input,
	Output,
	ElementRef, 
	Renderer,
	ViewChild,
	Directive
} from '@angular/core';

import {MindMapNode, Side} from './model/mindmap-node.class'
import {ElementSizes} from './model/element-sizes.class'

@Directive({
	selector: 'mind-map-branch canvas'
})
export class MindMapBranchCanvas {
	constructor(public renderer: Renderer, public elementRef: ElementRef) {};
}

@Component({
	selector: 'mind-map-branch',
	template: `<canvas id="branch_canvas"
			class="canvas_branch" ></canvas>`
})

//			[style.width.px]="canvas_width"
//			[style.height.px]="canvas_height"
//			[style.top.px]="canvas_top"
//			[style.left.px]="canvas_left" >

export class MindMapBranchComponent {
	private canvas_width: number = 100;
	private canvas_height: number = 100;
	private canvas_top: number = 0;
	private canvas_left: number = 0;
	@Input() node1: MindMapNode;
	@Input() node2: MindMapNode;

	@ViewChild(MindMapBranchCanvas) canvasChild: MindMapBranchCanvas;

	private l1: [number,number] = [0,0];
	private l2: [number,number] = [0,0];
	private r1: [number,number] = [0,0];
	private r2: [number,number] = [0,0];

	constructor(public renderer: Renderer, public elementRef: ElementRef) {};

	update() {
		this.resizeCanvas();
		this.drawCanvas();
	}

	private resizeCanvas() {
		let node1_element = $(".node#" + this.node1.id);
		let node2_element = $(".node#" + this.node2.id);

		if( node1_element.length > 0 && node2_element.length > 0 ) {
			let sizes1 = new ElementSizes(node1_element);
			let sizes2 = new ElementSizes(node2_element,node1_element.offsetParent());

			let l1 = this.l1 = sizes1.mediumLeft(false);
			let r1 = this.r1 = sizes1.mediumRight(false);

			let l2 = this.l2 = sizes2.mediumLeft(false);
			let r2 = this.r2 = sizes2.mediumRight(false);
			
			let toRight = r1[0] < r2[0];
			this.canvas_width = toRight ? l2[0]-r1[0] : l1[0]-r2[0];
			if( this.canvas_width == 0 )
				this.canvas_width = 2;
			this.canvas_height = l1[1] > l2[1] ? l1[1]-l2[1] : l2[1]-l1[1];
			if( this.canvas_height == 0 )
				this.canvas_height = 2;
			this.canvas_top = l1[1] < l2[1] ? l1[1] : l2[1];
			this.canvas_left = toRight ? r1[0] : r2[0];
		}
	}

	private drawCanvas() {
		let canvas: any = this.canvasChild.elementRef.nativeElement;
		let context = canvas.getContext("2d");
	
		let w = this.canvas_width;
		let h = this.canvas_height;
		canvas.width = w;
		canvas.height = h;

		$(canvas).css({
			width: this.canvas_width + 'px',
			height: this.canvas_height + 'px',
			top: this.canvas_top + 'px',
			left: this.canvas_left + 'px'
		});

		context.clearRect(0, 0, this.canvas_width, this.canvas_height);
	
		context.beginPath();
		if( (this.l2[1] > this.l1[1] && this.node2.side == Side.Right) ||
			(this.l2[1] < this.l1[1] && this.node2.side == Side.Left) ) {
			context.moveTo(0,1);
			context.bezierCurveTo(
				w/2,1,
				w/2,h-1,
				w,h-1);
		} else {
			context.moveTo(0,h-2);
			context.bezierCurveTo(
				w/2,h-1,
				w/2,1,
				w,1);
		}
		context.lineWidth = 1;
		context.strokeStyle = 'black';
		context.stroke();
	}
}