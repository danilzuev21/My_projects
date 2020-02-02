import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Settings } from './settings'

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	constructor(private http: HttpClient) { }

	get(): Observable<Settings> {
		return this.http.get<Settings>('http://localhost:80/data/settings');
	}

	save(settings: Settings) {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
		this.http.put('http://localhost:80/data/settings',
			settings, httpOptions).subscribe();
	}
}
