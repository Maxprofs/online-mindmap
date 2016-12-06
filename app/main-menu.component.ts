import { Component } from '@angular/core';

export class Side {
	id: number;
	name: string;
}

const SIDES: Side[] = [
	{ id: 0, name: 'left' },
	{ id: 1, name: 'right' },
	{ id: 2, name: 'top' },
	{ id: 3, name: 'botton' },
];

@Component({
  selector: 'main-menu',
  templateUrl: '/templates/main-menu.template.html'
})

export class MainMenuComponent  {
	side: Side = SIDES[0];
	open: boolean = false;

	openMenu(): void {
		this.open = true;
	}

	closeMenu(): void {
		this.open = false;
	}

	switchMenu(): void {
		this.open = !this.open;
	}
}