import { Component, Input, OnInit, Output, TemplateRef, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-create-edit-template',
    templateUrl: './create-edit-template.component.html'
})
export class CreateEditTemplateComponent {
    @Input() contentBodyTemplateRef!: TemplateRef<any>;
    @Input() contentTitle!: string;
    @Input() isEdit!: boolean;
    @Output() closeDialog = new EventEmitter<void>();
    constructor() { }

    public close(){
        this.closeDialog.emit();
    }

}
