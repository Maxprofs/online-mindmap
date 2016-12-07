import { Utils } from './utils.class';

export const DEFAULT_STYLE = {};

export class MindMapNode {
	id: string;
	text: string;
	icon: string;
	rel_x: number;
	rel_y: number;
	style: any;
	parent: MindMapNode;
	subNodes: MindMapNode[];

	constructor( text?: string, id?: string ) {
		this.id = id ? id : Utils.newGuid();
		this.text = text ? text : "";
		this.rel_x = 0;
		this.rel_y = 0;
		this.style = DEFAULT_STYLE;
		this.subNodes = [];
		this.parent = null;
	}

	add ( node: MindMapNode ): void {
		this.subNodes.push(node);
		node.parent = this;
	}

	addBefore( node: MindMapNode, sibling: MindMapNode ): void {
		for( let index in this.subNodes ) {
			if( node.id === this.subNodes[index].id ) {
				this.subNodes.splice( Number(index)+1, 0, sibling );
				sibling.parent = this;
				break;
			}
		}
	}

	remove ( node: MindMapNode ): void {
		for( let index in this.subNodes ) {
			if( node.id === this.subNodes[index].id ) {
				this.subNodes.splice( Number(index), 1 );
				break;
			}
		}
	}
};