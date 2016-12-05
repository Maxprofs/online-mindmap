import { Utils } from './utils.class';

export const DEFAULT_STYLE = {};

export class MindMapNode {
	id: string;
	text: string;
	icon: string;
	rel_x: number;
	rel_y: number;
	style: any;
	subNodes: MindMapNode[];

	constructor( id?: string ) {
		this.id = id ? id : Utils.newGuid();
		this.text = "";
		this.rel_x = 0;
		this.rel_y = 0;
		this.style = DEFAULT_STYLE;
		this.subNodes = [];
	}

	add ( node: MindMapNode ): void {
		this.subNodes.push(node);
	}
};