import { MindMapNode } from './mindmapnode.class';

export class MindMap extends MindMapNode {
	constructor( id?:string ) {
		super(id);
		this.text = "New Mind Map";
	}
}