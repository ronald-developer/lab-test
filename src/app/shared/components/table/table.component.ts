import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	@Input() tableRowsTemplateRef!: TemplateRef<any>;
	@Input() tableHeaderRowTemplateRef!: TemplateRef<any>;
	@Input() totalCount!: number;
	@Input() currentPage!: number;
	@Input() pageSize = 10;
	@Input() disablePagination!: boolean;
	@Input() enableNavPagination!: boolean;
	@Output() pageChanged = new EventEmitter<number>();

	public navPage: number = 1;
	constructor() { }

	ngOnInit(): void {
	}

	public onPageChange(page: PageChangedEvent) {
		this.pageChanged.emit(page.page);
	}


	public onPrevPageClick(): void {
		if (this.navPage !== 1) {
			this.navPage = this.navPage - 1;
		}
		this.pageChanged.emit(this.navPage);
	}

	public onNextPageClick(): void {
		this.navPage++;
		this.pageChanged.emit(this.navPage);
	}
}
