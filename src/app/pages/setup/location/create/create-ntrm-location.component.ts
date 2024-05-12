import { Component, OnInit } from '@angular/core';
import { NtrmLocationForm } from '../models/ntrm-location-form-descriptor';
import { NtrmLocationApiService } from 'src/app/api-services/setup/ntrm-location-api/ntrm-location-api.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { RequestNtrmLocationEntry } from 'src/app/api-services/setup/ntrm-location-api/models/request-ntrm-location-entry';
import { PostCreateNtrmLocationRequest } from 'src/app/api-services/setup/ntrm-location-api/requests/post-create-ntrm-location-request';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-ntrm-location',
  templateUrl: './create-ntrm-location.component.html'
})
export class CreateNtrmLocationComponent extends BaseComponent implements OnInit {

  constructor(
    private ntrmLocationApiService: NtrmLocationApiService,
    private toastr: ToastrService,) { super(); }

  ngOnInit(): void {
  }

  public reset: boolean = false;
  public save(result: NtrmLocationForm) {
    this.loading(true);

    const data: RequestNtrmLocationEntry = {
      name: result.name, isActive: result.isActive
    }

    const request = new PostCreateNtrmLocationRequest(data);
    this.ntrmLocationApiService.create(request).pipe(
      tap(() => {
        this.reset = true;
        this.toastr.success('Ntrm location created', 'Success!');
      }),
      this.endLoading()).subscribe();
  }
}
