import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Stock } from './stock'

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class StocksService {
	constructor(private http: HttpClient) { }

	get(): Observable<Stock[]> {
		return this.http.get<Stock[]>('http://localhost:80/data/stocks');
	}

	getById(id: number): Observable<Stock> {
		return this.http.get<Stock>('http://localhost:80/data/stockById/' + id);
	}

	add(data: Stock): Observable<Stock[]> {
		return this.http.post<Stock[]>('http://localhost:80/data/stock',
			data, httpOptions);
	}

	update(data: Stock): Observable<Stock[]> {
		return this.http.put<Stock[]>('http://localhost:80/data/stock/' + data.id,
			data, httpOptions);
	}

	delete(id: number): Observable<Stock[]> {
		return this.http.put<Stock[]>('http://localhost:80/data/stock/delete/' + id,
			"", httpOptions);
	}
}
