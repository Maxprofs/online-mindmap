import { Injectable } from '@angular/core';

import { MindMap } from './mindmap.class';

@Injectable()
export class MindMapService {

	mindMap: MindMap;

	getMindMap(): Promise<MindMap> {
		if( !this.mindMap )
			this.mindMap = new MindMap();

		return Promise.resolve(this.mindMap);
	};
}