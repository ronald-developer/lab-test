import { UiBlockingService } from './../../../../../../core/services/ui-blocking.service';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService, UserModel } from '../../../../../../modules/auth';

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  user$: Observable<UserModel | null>;
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private blockingService: UiBlockingService
  ) { }

  ngOnInit(): void {
    this.user$ = this.auth.user;
  }

  logout() {
    var id = this.blockingService.pushBlock();
    this.auth.logOut();
    document.location.reload();
    this.blockingService.popBlock(id);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}
