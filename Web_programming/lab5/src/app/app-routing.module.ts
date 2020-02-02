import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrokerListComponent }  from './broker-list/broker-list.component';
import { StockListComponent }   from './stock-list/stock-list.component';
import { SettingsComponent }    from './settings/settings.component';

const routes: Routes = [
	{ path: '', redirectTo: '/brokers', pathMatch: 'full' },
	{ path: 'brokers', component: BrokerListComponent},
	{ path: 'stocks', component: StockListComponent},
	{ path: 'settings', component: SettingsComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
