import { Component } from '@angular/core';

@Component({
    selector: 'app-block-ui',
    styleUrls: ['./block-ui.component.scss'],
    template: `
    <div class="outer-container">
        <div class="spinner-wrapper">

            <div class="spinner-container">
                <span class="spinner-border spinner-border-xl align-middle ms-2"></span>
            </div>
            <div *ngIf="message && message.length > 0">
                <div *ngFor="let msg of message">
                    <p>{{msg}}</p>
                </div>
            </div>


        </div>
    </div>
  `
})
export class BlockUiComponent {
    message!: any[];
}
