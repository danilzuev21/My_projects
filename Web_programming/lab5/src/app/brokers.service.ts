import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Broker } from './broker'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class BrokersService {
	constructor(private http: HttpClient) { }

	get(): Observable<Broker[]> {
		return this.http.get<Broker[]>('http://localhost:80/data/brokers');
	}

	getById(id: number): Observable<Broker> {
		return this.http.get<Broker>('http://localhost:80/data/brokerById/' + id);
	}

	add(data: Broker): Observable<Broker[]> {
		return this.http.post<Broker[]>('http://localhost:80/data/broker',
			data, httpOptions);
	}

	update(data: Broker): Observable<Broker[]> {
		return this.http.put<Broker[]>('http://localhost:80/data/broker/' + data.id,
			data, httpOptions);
	}

	delete(id: number): Observable<Broker[]> {
		return this.http.put<Broker[]>('http://localhost:80/data/broker/delete/' + id,
			"", httpOptions);
	}
}
