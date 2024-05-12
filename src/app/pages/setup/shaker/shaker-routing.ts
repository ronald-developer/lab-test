import { Routes } from '@angular/router';
import { NavConfig } from 'src/app/core/components/sidebar-menu-nav/constants/nav-configuration';
import { AuthGuard } from 'src/app/modules/auth/services/auth.guard.service';
import { ShakerNavigationPath } from './navigation/shaker-navigation-path';
import { CreateShakerComponent } from './create/create-shaker.component';
import { EditShakerComponent } from './edit/edit-shaker.component';
import { ShakerListComponent } from './list/shaker-list.component';

const parent = ShakerNavigationPath.parent;
const children = ShakerNavigationPath.children;
export const shakerRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: children.list
	},
	{
		path: children.list,
		data: { roles: NavConfig.getSetupRoles(`${parent}/${children.list}`) },
		component: ShakerListComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.create,
		data: { roles: NavConfig.getSetupRoles(`${parent}/${children.create}`) },
		component: CreateShakerComponent,
		canActivate: [AuthGuard]
	},
	{
		path: children.edit,
		data: { roles: NavConfig.getSetupRoles(`${parent}/${children.edit}`) },
		component: EditShakerComponent,
		canActivate: [AuthGuard]
	}
];
