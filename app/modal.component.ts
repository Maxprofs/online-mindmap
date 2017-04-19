import{ Component } from '@angular/core'

@Component({
	selector: 'modal',
	template: ` 
		<div id=modal>
			<div *ngIf="view_modal" class=background >
				<div id=dialog>
					<div id=dialog-header >
						<ng-content select=".modal-title"></ng-content>
						<button id=close (click)="close()"><i class="fa fa-close"></i></button>
					</div>
					<div id=dialog-content >
						<ng-content select=".modal-content"></ng-content>
					</div>
				</div>
			</div>
		</div>
	`
})

export class Modal {
	view_modal: boolean = false;

	public close() {
		this.view_modal = false;
	}

	public open() {
		this.view_modal = true;
	}
}