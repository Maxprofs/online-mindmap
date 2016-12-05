import { Injectable } from '@angular/core';

import { MindMap } from './mindmap.class';

@Injectable()
export class MindMapService {
	getMindMap(): Promise<MindMap> {
		return Promise.resolve(new MindMap());
	};
}