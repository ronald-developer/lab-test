import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UiBlockingService } from "src/app/core/services/ui-blocking.service";
import { ConfirmationDialogComponent } from "../../components/confirmation-dialog/confirmation-dialog.component";
import { RequestUpdateNcpTestEntryModel } from "src/app/api-services/lab-tests/lab-tests-compliance-api/models/request-update-ncp-test-entry-model";
import { LabTestsComplianceApiService } from "src/app/api-services/lab-tests/lab-tests-compliance-api/lab-tests-compliance-api.service";
import { ToastrService } from "ngx-toastr";
import { Subject, finalize } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class NcpConfirmationService {
	constructor(
		private labTestsComplianceApiService: LabTestsComplianceApiService,
		private modalService: NgbModal,
		private toastr: ToastrService,
		private uiBlockingService: UiBlockingService) { }
		private isSuccess = new Subject<boolean>();

	public confirmation(labTestType: number, testId: string, el: HTMLInputElement) {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'md', centered: true, backdrop: 'static' });
		const instance = modalRef.componentInstance as ConfirmationDialogComponent;
		instance.confirmAction(() => {
			const id = this.uiBlockingService.pushBlock();
			this.labTestsComplianceApiService.updateNcp(testId, new RequestUpdateNcpTestEntryModel(labTestType, el.checked)).pipe(finalize(()=>{
				this.uiBlockingService.popBlock(id);
				instance.close();
			})).subscribe(data => {
				this.toastr.success('Updated non-compliant status', 'Success!');
				this.isSuccess.next(true);
			});
		});

		instance.declineAction(() => {
			el.checked = !el.checked;
			instance.close();
		});

		return this.isSuccess;
	}
}
