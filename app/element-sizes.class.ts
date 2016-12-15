/// <reference path="jquery.d.ts" />

import {Error} from './utils.class'

export class ElementSizes {
	public position: [number,number];
	public offset: [number,number];
	public width: number;
	public height: number;
	public left_margin: number;
	public right_margin: number;

	constructor( element: JQuery, parent: JQuery = null ) {
		let position = element.position();
		this.position = [position.left,position.top];
		this.width = element.outerWidth(true);
		this.height = element.outerHeight(true);
		this.left_margin = parseInt(element.css("margin-left"));
		this.right_margin = parseInt(element.css("margin-right"));

		this.offset = [0,0];
		if( parent ) {
			if( !$.contains(parent[0],element[0]) )
				throw new Error("Element not contained in parent.");

			let np = element.offsetParent();
			while( np.get(0) != parent.get(0) ) {
				let p = np.position();
				this.offset[1] += p.top;
				this.offset[0] += p.left;

				np = np.offsetParent();
			}
		}
	}

	mediumLeft(withMargin:boolean=true):[number,number]  {
		return [this.position[0]+this.offset[0]+(withMargin?0:this.left_margin),
			this.position[1]+this.offset[1]+(this.height/2.0)];
	}

	mediumRight(withMargin:boolean=true):[number,number]  {
		return [this.position[0]+this.offset[0]+this.width-(withMargin?0:this.left_margin),
			this.position[1]+this.offset[1]+(this.height/2.0)];
	}
}