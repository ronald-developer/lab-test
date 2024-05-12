import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { tap } from 'rxjs/operators';
import { ShakerForm } from '../models/shaker-form-descriptor';
import { RequestShakerEntry } from 'src/app/api-services/setup/shaker-api/models/request-shaker-entry';
import { PostCreateShakerRequest } from 'src/app/api-services/setup/shaker-api/requests/post-create-shaker-request';
import { ShakerApiService } from 'src/app/api-services/setup/shaker-api/shaker-api.service';

@Component({
	selector: 'app-create-shaker',
	templateUrl: './create-shaker.component.html'
})
export class CreateShakerComponent extends BaseComponent implements OnInit {

	constructor(
		private shakerApiService: ShakerApiService,
		private toastr: ToastrService,) { super(); }

	ngOnInit(): void {
	}

	public reset: boolean = false;
	public save(result: ShakerForm) {
		this.loading(true);

		const data: RequestShakerEntry = {
			name: result.name, isActive: result.isActive
		}

		const request = new PostCreateShakerRequest(data);
		this.shakerApiService.create(request).pipe(
			tap(() => {
				this.reset = true;
				this.toastr.success('Shaker created', 'Success!');
			}),
			this.endLoading()).subscribe();
	}
}
