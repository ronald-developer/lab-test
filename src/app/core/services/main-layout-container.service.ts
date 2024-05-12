import { Injectable } from '@angular/core';
import { delay, Subject } from 'rxjs';

/**
 * Service to notify components for the layout size changed of layout.component
 */
@Injectable({
    providedIn: 'root'
})
export class MainLayoutContainerService {

    private mainLayoutWidthSource = new Subject<number>();
    public mainLayoutWidth$ = this.mainLayoutWidthSource.asObservable().pipe(delay(250));

    private widthChangedSource = new Subject<void>();
    public widthChanged$ = this.widthChangedSource.asObservable();
    constructor() { }

    public updateWidth(size: number) {
        this.mainLayoutWidthSource.next(size)
    }

    public calculateWidth(){
        this.widthChangedSource.next();
    }
}
