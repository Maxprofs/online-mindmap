import { Component, Input, forwardRef } from '@angular/core';

import { MindMapNode } from './mindmapnode.class'

@Component({
	selector: 'mind-map-node',
	templateUrl: '/templates/mindmapnode.template.html'
})

export class MindMapNodeComponent {
	@Input() node: MindMapNode;
}