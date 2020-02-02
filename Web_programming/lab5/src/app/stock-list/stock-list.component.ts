import { Component, OnInit, Input } from '@angular/core';

import { StocksService } from '../stocks.service'
import { Stock } from '../stock'

@Component({
	selector: 'app-stock-list',
	templateUrl: './stock-list.component.html',
	styleUrls: [
		'../styles/table.css',
		'../styles/dialog.css',
		'./stock-list.component.css'
	]
})
export class StockListComponent implements OnInit {
	@Input() stock: Stock;
	stocks: Stock[];
	currDialog: string = null;

	constructor(private stocksService: StocksService) { }

	ngOnInit() {
		this.currDialog = null;
		this.stock = new Stock();
		this.stocksService.get().subscribe(data => this.stocks = data);
	}

	showAddStockDialog() {
		this.stock.name = null;
		this.stock.startingPrice = null;
		this.stock.distribType = null;
		this.stock.maxChangeValue = null;
		this.stock.quantity = null;
		this.stock.id = null;
		this.currDialog = "Add";
	}
	showEditStockDialog(stock) {
		this.stock.name = stock.name;
		this.stock.startingPrice = stock.startingPrice;
		this.stock.distribType = stock.distribType;
		this.stock.maxChangeValue = stock.maxChangeValue;
		this.stock.quantity = stock.quantity;
		this.stock.id = stock.id;
		this.currDialog = "Edit";
	}
	hideDialog() {
		this.currDialog = null;
	}

	okButton() {
		if (this.currDialog == "Add")
			this.stocksService.add(this.stock)
				.subscribe(data => this.stocks = data);
		else if (this.currDialog == "Edit")
			this.stocksService.update(this.stock)
				.subscribe(data => this.stocks = data);
		this.hideDialog();
	}
	cancelButton() {
		this.hideDialog();
	}
	deleteButton() {
		this.stocksService.delete(this.stock.id)
			.subscribe(data => this.stocks = data);
		this.hideDialog();
	}
}
