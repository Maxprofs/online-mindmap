import { Injectable } from '@angular/core';
import { MindMap } from '../model/mindmap.class';
import { WindowRef } from './windowref.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/startWith'

export interface MindMapRef {
	id: string;
	name: string;
}

@Injectable()
export class MindMapService {

	constructor( private winRef: WindowRef ){
		if( this.storageAvailable() ) {
			this.storage = winRef.nativeWindow.localStorage;
			this.mapsList = JSON.parse( this.storage.getItem(this.LIST_KEY) );
		}

		if( !this.mapsList ) {
			this.mapsList = <MindMapRef[]>[];
			this.saveList();
		}

		this.mindMap = new MindMap();
		this.mindMapObservable.next( this.mindMap );
	}

	private LIST_KEY: string = '__OMM_MAPSLIST__';
	private map_key(id:string): string {
		return '__OMM_MAP_' + id + '__';
	}

	private mapsList: MindMapRef[] = null;
	private storage: any = null;
	private mindMap: MindMap;

	mapsListObservable: Subject<MindMapRef[]> = 
		new Subject();
		//Subject.create((obs:Observer<MindMapRef[]>)=>obs.next(this.mapsList));
	mindMapObservable: Subject<MindMap> = 
		new Subject();
		//Subject.create((obs:Observer<MindMap>)=>obs.next(this.mindMap));

	getMindMapsListObservable(): Observable<MindMapRef[]> {
		return this.mapsListObservable.startWith(this.mapsList);
	}

	getMindMapObservable(): Observable<MindMap> {
		return this.mindMapObservable.startWith(this.mindMap);
	};

	saveMindMap(): Promise<boolean> {
		if( !this.mindMap || !this.storage )
			return Promise.resolve(false);

		var key: string = this.map_key( this.mindMap.id );
		this.storage.setItem( key, this.serialize( this.mindMap ) );
		this.updateList( this.mindMap );
	}

	loadMindMap( id: string ): Promise<boolean> {
		var mindMap = this.deserialize( this.storage.getItem( this.map_key(id) ) );
		if( !mindMap )
			return Promise.resolve( false );
		else {
			this.mindMap = mindMap;
			this.mindMapObservable.next( this.mindMap );
			return Promise.resolve(true);
		}
	}

	private updateList( map: MindMap ) {
		var found = false;
		for( let ref of this.mapsList ) {
			if( ref.id == map.id )
			{
				ref.name = map.text;
				found = true;
				break;
			}
		}

		if( !found )
			this.mapsList.push({id:map.id,name:map.text});

		this.saveList();
	}

	private saveList() {
		if( this.storage )
			this.storage.setItem( this.LIST_KEY, JSON.stringify(this.mapsList) );
		this.mapsListObservable.next( this.mapsList );
	}

	private storageAvailable(): boolean {
		try {
			var storage = this.winRef.nativeWindow.localStorage,
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return false;
		}
	}

	private serialize( mindMap: MindMap ): string {
		return JSON.stringify( mindMap, function(key,val){
			return (key=='parent'||key=='selectedNode')?undefined:val;
		});
	}

	private deserialize( json: string ): MindMap {
		if( json )
			return new MindMap( JSON.parse(json) );

		return null;
	}
}