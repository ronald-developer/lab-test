import { HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessagingService, ShowErrorLocationLevel } from '../core/services/error-messaging.service';
const internalServerErrorMessage = 'An unexpected error occured! Please contact your administrator'
export function errorHandler(errorMessagingService: ErrorMessagingService, showErrorLocationLevel: ShowErrorLocationLevel = 'global') {

	const getErrorMessage = (err: any) => {
		if (err.status == 0) {
			return err.message;
		}
		return err.status <= HttpStatusCode.BadRequest ? err.error.errorMessages : internalServerErrorMessage;
	}

	return function (source: Observable<any>) {
		return source.pipe(catchError(err => {
			return errorMessagingService.setMessage({
				message: getErrorMessage(err),
				httpErrorResponse: err,
				severity: err.status == 0 ? 'critical' : err.status <= HttpStatusCode.BadRequest ? 'warning' : 'critical',
				title: err.error.response,
				showErrorLocationLevel: showErrorLocationLevel
			});
		}))
	}



}
