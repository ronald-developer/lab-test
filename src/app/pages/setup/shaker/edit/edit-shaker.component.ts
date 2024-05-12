import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import * as kthelpers from '../../../../_metronic/kt/components/MenuComponent';
import { ShakerForm } from '../models/shaker-form-descriptor';
import { ShakerApiService } from 'src/app/api-services/setup/shaker-api/shaker-api.service';
import { PutUpdateShakerRequest } from 'src/app/api-services/setup/shaker-api/requests/put-update-shaker-request';
import { RequestShakerEntry } from 'src/app/api-services/setup/shaker-api/models/request-shaker-entry';
@Component({
    selector: 'app-edit-shaker',
    templateUrl: './edit-shaker.component.html'
})
export class EditShakerComponent extends BaseComponent implements OnInit, AfterViewInit {

    public id: string;
    public reset: boolean = false;
    public shakerForm!: ShakerForm;
    constructor(
        private shakerApiService: ShakerApiService,
        private activeModal: NgbActiveModal,
        private toastr: ToastrService,
        private detector: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.loading(true);
        this.shakerApiService.getById(this.id).pipe(
            tap(result => {
                const response = result.response.data;
                this.shakerForm = { isActive: response.isActive, name: response.name };
            }),
            this.endLoading()).subscribe();
    }

    ngAfterViewInit(): void {
        kthelpers.MenuComponent.reinitialization();
    }

    public update(result: ShakerForm) {
        this.loading(true);
        const data: RequestShakerEntry = {
            name: result.name, isActive: result.isActive
        }
        const request = new PutUpdateShakerRequest(data);

        this.shakerApiService.update(this.id, request).pipe(tap(() => {
            this.reset = true;
            this.toastr.success('Shaker updated', 'Success!');
            this.close(true);
            this.detector.detectChanges();
        }), this.endLoading()).subscribe();
    }

    public close(isSaveChanges?: boolean) {
        this.activeModal.close(isSaveChanges);
    }

}
