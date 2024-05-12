import { Routes } from '@angular/router';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { CreateNtrmLocationComponent } from './create/create-ntrm-location.component';
import { EditNtrmLocationComponent } from './edit/edit-ntrm-location.component';
import { NtrmLocationListComponent } from './list/ntrm-location-list.component';
import { LocationNavigationPath } from './navigation/location-navigation-path';

const parent = LocationNavigationPath.parent;
const children = LocationNavigationPath.children;
export const locationRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: children.list
  },
  {
    path: children.list,
    data: { roles: NavConfig.getSetupRoles(`${parent}/${children.list}`) },
    component: NtrmLocationListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: children.create,
    data: { roles: NavConfig.getSetupRoles(`${parent}/${children.create}`) },
    component: CreateNtrmLocationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: children.edit,
    data: { roles: NavConfig.getSetupRoles(`${parent}/${children.edit}`) },
    component: EditNtrmLocationComponent,
    canActivate: [AuthGuard]
  }
];
