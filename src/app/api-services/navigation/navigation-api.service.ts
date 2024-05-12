import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationType } from './../../common/application-type.enum';
const API_USERS_URL = `${environment.apiUrl}`;
@Injectable({
    providedIn: 'root'
})
export class NavigationApiService {
    constructor() {
    }
    public redirectToSystem(applicationType: ApplicationType) {
        const url = `${API_USERS_URL}/navigation/navtosystem?applicationType=${applicationType}`;
        window.location.href = url;
    }
}
