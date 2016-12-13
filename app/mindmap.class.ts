import { MindMapNode, Side } from './mindmapnode.class';

export class MindMap extends MindMapNode {
	constructor( id?:string ) {
		super(id);
		this.text = "New Mind Map";
		this.side = Side.None;
	}

	addLeft(node:MindMapNode) {
		this.add(node);
		node.side = Side.Left;
	}

	addRight( node:MindMapNode ) {
		this.add(node);
		node.side = Side.Right;
	}
}