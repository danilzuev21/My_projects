import { Component, OnInit, Input } from '@angular/core';

import { BrokersService } from '../brokers.service'
import { Broker } from '../broker'

@Component({
	selector: 'app-broker-list',
	templateUrl: './broker-list.component.html',
	styleUrls: [
		'../styles/table.css',
		'../styles/dialog.css',
		'./broker-list.component.css'
	]
})
export class BrokerListComponent implements OnInit {
	@Input() broker: Broker;
	brokers: Broker[];
	currDialog: string = null;

	constructor(private brokersService: BrokersService) { }

	ngOnInit() {
		this.currDialog = null;
		this.broker = new Broker();
		this.brokersService.get().subscribe(data => this.brokers = data);
	}

	showAddBrokerDialog() {
		this.broker.name = null;
		this.broker.wealth = null;
		this.broker.id = null;
		this.currDialog = "Add";
	}
	showEditBrokerDialog(broker:Broker) {
		this.broker.name = broker.name;
		this.broker.wealth = broker.wealth;
		this.broker.id = broker.id;
		this.currDialog = "Edit";
	}
	hideDialog() {
		this.currDialog = null;
	}

	okButton() {
		if (this.currDialog == "Add") {
			this.brokersService.add(this.broker)
				.subscribe(data => this.brokers = data);
			this.brokersService.get().subscribe(data => this.brokers = data);
		}
		else if (this.currDialog == "Edit") {
			this.brokersService.update(this.broker)
				.subscribe(data => this.brokers = data);
			this.brokersService.get().subscribe(data => this.brokers = data);
		}
		this.hideDialog();
	}
	cancelButton() {
		this.hideDialog();
	}
	deleteButton() {
		this.brokersService.delete(this.broker.id)
			.subscribe(data => this.brokers = data);
		this.brokersService.get().subscribe(data => this.brokers = data);
		this.hideDialog();
	}
}
