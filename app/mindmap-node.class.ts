import { Utils } from './utils.class';

export const DEFAULT_STYLE = {};

export enum Side {
	None,
	Right,
	Left
}

export class MindMapNode {
	id: string;
	text: string;
	icon: string;
	rel_x: number;
	rel_y: number;
	style: any;
	parent: MindMapNode;
	subNodes: MindMapNode[];
	side: Side;

	constructor( text: string, side?: Side, id?: string ) {
		this.id = id ? id : Utils.newId();
		this.text = text ? text : "";
		this.rel_x = 0;
		this.rel_y = 0;
		this.style = DEFAULT_STYLE;
		this.subNodes = [];
		this.parent = null;
		this.side = side ? side : Side.None; 

	}

	add ( node: MindMapNode,  ): void {
		this.subNodes.push(node);
		node.parent = this;
		node.side = this.side;
	}

	addAfter( node: MindMapNode, sibling: MindMapNode ): void {
		for( let index in this.subNodes ) {
			if( node.id === this.subNodes[index].id ) {
				this.subNodes.splice( Number(index)+1, 0, sibling );
				sibling.parent = this;
				sibling.side = node.side;
				break;
			}
		}
	}

	addBefore( node: MindMapNode, sibling: MindMapNode ): void {
		for( let index in this.subNodes ) {
			if( node.id === this.subNodes[index].id ) {
				this.subNodes.splice( Number(index), 0, sibling );
				sibling.parent = this;
				sibling.side = node.side;
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

	left():boolean {
		return this.side == Side.Left;
	}

	right():boolean {
		return this.side == Side.Right;
	}
};