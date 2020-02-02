import { Component, OnInit, Input } from '@angular/core';

import { Settings } from '../settings'
import { SettingsService } from '../settings.service'

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
	@Input() settings: Settings;
	constructor(private settingsService: SettingsService) { }

	ngOnInit() {
		this.settings = new Settings();
		this.load();
	}

	load() {
		this.settingsService.get()
			.subscribe(settings => this.settings = settings);
	}

	log(str: String) {
		console.log(str);
	}
	save() {
		this.settingsService.save(this.settings);
	}
}
