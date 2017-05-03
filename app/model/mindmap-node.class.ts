import { Utils } from '../utils/utils.class';

export const DEFAULT_STYLE = {};

export enum Side {
	None,
	Right,
	Left
}

export class MindMapNode {
	id: string;
	text: string;
	selected: boolean;
	parent: MindMapNode;
	subNodes: MindMapNode[];
	side: Side;

	icon: string;
	rel_x: number;
	rel_y: number;
	style: any;

	constructor() {
		this.id = Utils.newId();
		this.text = "New Node";
		this.rel_x = 0;
		this.rel_y = 0;
		this.style = DEFAULT_STYLE;
		this.subNodes = [];
		this.parent = null;
		this.side = Side.None; 
		this.selected = false;
	}

	add ( node: MindMapNode,  ): void {
		this.subNodes.push(node);
		node.parent = this;
		node.side = this.side;
		this.selectNode(node);
	}

	addAfter( node: MindMapNode, sibling: MindMapNode ): void {
		for( let index in this.subNodes ) {
			if( node.id === this.subNodes[index].id ) {
				this.subNodes.splice( Number(index)+1, 0, sibling );
				sibling.parent = this;
				sibling.side = node.side;
				this.selectNode(sibling);
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
				this.selectNode(sibling);
				break;
			}
		}
	}

	remove ( node: MindMapNode ): void {
		for( let index in this.subNodes ) {
			if( node.id === this.subNodes[index].id ) {
				this.subNodes.splice( Number(index), 1 );
				this.selectNode(this);
				break;
			}
		}
	}

	selectNode (node: MindMapNode) {
		this.parent.selectNode(node);
	}

	left():boolean {
		return this.side == Side.Left;
	}

	right():boolean {
		return this.side == Side.Right;
	}
};