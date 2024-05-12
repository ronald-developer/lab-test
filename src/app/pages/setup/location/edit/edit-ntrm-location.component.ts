import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { RequestNtrmLocationEntry } from 'src/app/api-services/setup/ntrm-location-api/models/request-ntrm-location-entry';
import { NtrmLocationApiService } from 'src/app/api-services/setup/ntrm-location-api/ntrm-location-api.service';
import { PutUpdateNtrmLocationRequest } from 'src/app/api-services/setup/ntrm-location-api/requests/put-update-ntrm-location-request';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import * as kthelpers from '../../../../_metronic/kt/components/MenuComponent';
import { NtrmLocationForm } from '../models/ntrm-location-form-descriptor';
@Component({
    selector: 'app-edit-ntrm-location',
    templateUrl: './edit-ntrm-location.component.html'
})
export class EditNtrmLocationComponent extends BaseComponent implements OnInit, AfterViewInit {

    public id: string;
    public reset: boolean = false;
    public ntrmLocationForm!: NtrmLocationForm;
    constructor(
        private ntrmLocationApiService: NtrmLocationApiService,
        private activeModal: NgbActiveModal,
        private toastr: ToastrService,
        private detector: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.loading(true);
        this.ntrmLocationApiService.getById(this.id).pipe(
            tap(result => {
                const response = result.response.data;
                this.ntrmLocationForm = { isActive: response.isActive, name: response.name };
            }),
            this.endLoading()).subscribe();
    }

    ngAfterViewInit(): void {
        kthelpers.MenuComponent.reinitialization();
    }

    public update(result: NtrmLocationForm) {
        this.loading(true);
        const data: RequestNtrmLocationEntry = {
            name: result.name, isActive: result.isActive
        }
        const request = new PutUpdateNtrmLocationRequest(data);

        this.ntrmLocationApiService.update(this.id, request).pipe(tap(() => {
            this.reset = true;
            this.toastr.success('Ntrm location updated', 'Success!');
            this.close(true);
            this.detector.detectChanges();
        }), this.endLoading()).subscribe();
    }

    public close(isSaveChanges?: boolean) {
        this.activeModal.close(isSaveChanges);
    }

}
