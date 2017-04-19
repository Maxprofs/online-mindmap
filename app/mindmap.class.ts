import { MindMapNode, Side } from './mindmap-node.class';

export class MindMap extends MindMapNode {
	public selectedNode: MindMapNode;

	constructor() {
		super();
		this.text = "New Mind Map";
		this.side = Side.None;
		this.selectedNode = this;
		this.selected = true;
	}

	addLeft(node:MindMapNode) {
		this.add(node);
		node.side = Side.Left;
	}

	addRight( node:MindMapNode ) {
		this.add(node);
		node.side = Side.Right;
	}

	selectLeft():boolean {
		let newSelected: MindMapNode = null;

		switch(this.selectedNode.side) {
			case Side.Left:
				if( this.selectedNode.subNodes[0] )
					newSelected = this.selectedNode.subNodes[0];
				break;

			case Side.Right:
				newSelected = this.selectedNode.parent;
				break;

			case Side.None: 
				for( let subnode of this.selectedNode.subNodes ) {
					if( subnode.side == Side.Left ) {
						newSelected = subnode;
						break;
					}
				}
				break;
		}

		if( newSelected != null ) {
			this.selectNode( newSelected );
			return true;
		}
		return false;
	}

	selectRight():boolean {
		let newSelected: MindMapNode = null;

		switch(this.selectedNode.side) {
			case Side.Right:
				if( this.selectedNode.subNodes[0] )
					newSelected = this.selectedNode.subNodes[0];
				break;

			case Side.Left:
				newSelected = this.selectedNode.parent;
				break;

			case Side.None: 
				for( let subnode of this.selectedNode.subNodes ) {
					if( subnode.side == Side.Right ) {
						newSelected = subnode;
						break;
					}
				}
				break;
		}

		if( newSelected != null ) {
			this.selectNode( newSelected );
			return true;
		}
		return false;
	}

	selectUp():boolean {
		let newSelected: MindMapNode = null;
		let previous: MindMapNode = null;

		if( this.selectedNode.parent ) {
			for( let subnode of this.selectedNode.parent.subNodes ) {
				if( subnode == this.selectedNode ) {
					newSelected = previous;
					break;
				}

				previous = subnode;
			}
		}

		if( newSelected != null ) {
			this.selectNode( newSelected );
			return true;
		}
		return false;
	}

	selectDown():boolean {
		let newSelected: MindMapNode = null;
		let next: boolean = false;

		if( this.selectedNode.parent ) {
			for( let subnode of this.selectedNode.parent.subNodes ) {
				if( next ) {
					newSelected = subnode;
					break;
				}
				if( subnode == this.selectedNode )
					next = true;

			}
		}

		if( newSelected != null ) {
			this.selectNode( newSelected );
			return true;
		}
		return false;
	}

	selectNext():boolean {
		let s: boolean;
		let side = this.selectedNode.side;
		if( side == Side.None ) {
			s = this.selectRight();
			if( !s )
				this.selectLeft();
		} else if ( side == Side.Right ) {
			s = this.selectDown();
			if( !s )
				s = this.selectRight();
			if( !s ) {
				//while....
			}
		}


		return s;

	}

	selectNode( newSelected: MindMapNode ) {
		this.selectedNode.selected = false;
		this.selectedNode = newSelected;
		this.selectedNode.selected = true;
	}

	addToSelected() {
		if( this.selectedNode )
			if( this.selected )
				this.addRight( new MindMapNode() );
			else
				this.selectedNode.add(new MindMapNode());
	}


	addBeforeSelected() {
		if( this.selectedNode && !this.selected )
			this.selectedNode.parent.addBefore( this.selectedNode, new MindMapNode() );
	}

	addAfterSelected() {
		if( this.selectedNode && !this.selected )
			this.selectedNode.parent.addAfter( this.selectedNode, new MindMapNode() );
	}


	addLeftSelected(): void {
		if( this.selectedNode )
			if( this.selected )
				this.addLeft( new MindMapNode() );
			else if( this.selectedNode.side == Side.Left )
				this.selectedNode.add(new MindMapNode());
		
	}

	addRightSelected(): void {
		if( this.selectedNode )
			if( this.selected )
				this.addRight( new MindMapNode() );
			else if( this.selectedNode.side == Side.Right )
				this.selectedNode.add(new MindMapNode());
	}

	removeSelected() {
		if( this.selectedNode && !this.selected ) {
			this.selectedNode.parent.remove( this.selectedNode );
		}
	}
}