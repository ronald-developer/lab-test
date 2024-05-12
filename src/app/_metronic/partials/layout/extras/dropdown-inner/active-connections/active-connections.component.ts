import { ChangeDetectionStrategy } from '@angular/compiler';
import { ChangeDetectorRef, Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { environment } from 'src/environments/environment';
import { ActiveConnectionsModel } from './models/active-connections.model';

@Component({
	selector: 'app-active-connections',
	templateUrl: './active-connections.component.html',
})
export class ActiveConnectionsComponent implements OnInit {
	@HostBinding('class') class = 'menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px';
	@HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
	@HostBinding('attr.data-kt-search-element') dataKtSearch = 'content';
	@Output() connectedUsersCount = new EventEmitter<number>();

	public connections: ActiveConnectionsModel[] = [];
	private hubConnection: HubConnection;
	public user: UserModel | null | undefined;

	constructor(
		private authService: AuthService,
		private cdr: ChangeDetectorRef
	) {
	}

	async ngOnInit() {
		this.user = await this.authService.user.toPromise();

		if (this.user) {
			this.hubConnection = new signalR.HubConnectionBuilder()
				.withUrl(`${environment.apiUrl}/connectionhub?userId=${this.user.id}&name=${this.user.name}&email=${this.user.email}`)
				.build();

			this.hubConnection.start().then(() => {
				this.hubConnection.invoke("ShowActiveConnections");
			}).catch(err => console.error(err.toString()));

			this.hubConnection.on('showActiveUsers', data => {
				this.connections = [];
				data.forEach((item: any) => {
					this.connections.push(new ActiveConnectionsModel(item.name));  // exception to capitalization
				});
				this.connectedUsersCount.emit(data.length);
				this.cdr.detectChanges();
			});

		} else {
			console.error('Auth service returned empty user object');
		}
	}

}
