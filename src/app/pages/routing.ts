import { StemLengthNavigationPath } from './stem-length/navigation/stem-length-navigation-path';
import { Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/services/auth.guard.service';
import { NavConfig } from "../core/components/sidebar-menu-nav/constants/nav-configuration";
import { ShortStemNavigationPath } from './short-stem/navigation/short-stem-navigation-path';
import { FlagOnStemNavigationPath } from './flag-on-stem/navigation/flag-on-stem-navigation-path';
import { TipsNavigationPath } from './tips/navigation/tips-navigation-path';
import { LeavesNavigationPath } from './leaves/navigation/leaves-navigation-path';
import { LooseLeafNavigationPath } from './loose-leaf/navigation/loose-leaf-navigation-path';
import { ButtedLooseLeafNavigationPath } from './butted-loose-leaf/navigation/butted-loose-leaf-navigation-path';
import { StemInScrapNavigationPath } from './stem-in-scrap/navigation/stem-in-scrap-navigation-path';
import { StemDiameterNavigationPath } from './stem-diameter/navigation/stem-diameter-navigation-path';
import { InlineDataNavigationPath } from './inline-data/navigation/inline-data-navigation-path';
import { DensityNavigationPath } from './density/navigation/density-navigation-path';
import { InlineHsNavigationPath } from './inline-hs/navigation/inline-hs-navigation-path';
import { SetupNavigationPath } from './setup/setup-navigation-path';
import { DegsNavigationPath } from './degs/navigation/degs-navigation-path';
import { SandNavigationPath } from './sand/navigation/sand-navigation-path';
import { FinesNavigationPath } from './fines/navigation/fines-navigation-path';
import { NtrmGreenNavigationPath } from './ntrm-green/navigation/ntrm-green-navigation-path';
import { NtrmProductNavigationPath } from './ntrm-product/navigation/ntrm-product-navigation-path';
import { NtrmInLineNavigationPath } from './ntrm-in-line/navigation/ntrm-in-line-navigation-path';
import { MoistureAndTempNavigationPath } from './moisture-and-temp/navigation/moisture-and-temp-navigation-path';
import { ReportsNavigationPath } from './reports/reports-navigation-path';
import { ShakerEfficiencyNavigationPath } from './shaker-efficiency/navigation/shaker-efficiency-navigation-path';
import { BundleBusterNavigationPath } from './bundle-buster/navigation/bundle-buster-navigation-path';
import { StemAuditNavigationPath } from './stem-audit/navigation/stem-audit-navigation-path';

const Routing: Routes = [
	{
		path: 'dashboard',
		loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
		canActivate: [AuthGuard]
	},
	{
		path: StemLengthNavigationPath.parent,
		data: { roles: NavConfig.getRoles(StemLengthNavigationPath.parent) },
		loadChildren: () => import('./stem-length/stem-length.module').then((m) => m.StemLengthModule),
		canActivate: [AuthGuard]
	},
	{
		path: ShortStemNavigationPath.parent,
		data: { roles: NavConfig.getRoles(ShortStemNavigationPath.parent) },
		loadChildren: () => import('./short-stem/short-stem.module').then((m) => m.ShortStemModule),
		canActivate: [AuthGuard]
	},
	{
		path: FlagOnStemNavigationPath.parent,
		data: { roles: NavConfig.getRoles(FlagOnStemNavigationPath.parent) },
		loadChildren: () => import('./flag-on-stem/flag-on-stem.module').then((m) => m.FlagOnStemModule),
		canActivate: [AuthGuard]
	},
	{
		path: TipsNavigationPath.parent,
		data: { roles: NavConfig.getRoles(TipsNavigationPath.parent) },
		loadChildren: () => import('./tips/tips.module').then((m) => m.TipsModule),
		canActivate: [AuthGuard]
	},
	{
		path: LeavesNavigationPath.parent,
		data: { roles: NavConfig.getRoles(LeavesNavigationPath.parent) },
		loadChildren: () => import('./leaves/leaves.module').then((m) => m.LeavesModule),
		canActivate: [AuthGuard]
	},
	{
		path: LooseLeafNavigationPath.parent,
		data: { roles: NavConfig.getRoles(LooseLeafNavigationPath.parent) },
		loadChildren: () => import('./loose-leaf/loose-leaf.module').then((m) => m.LooseLeafModule),
		canActivate: [AuthGuard]
	},
	{
		path: InlineHsNavigationPath.parent,
		data: { roles: NavConfig.getRoles(InlineHsNavigationPath.parent) },
		loadChildren: () => import('./inline-hs/inline-hs.module').then((m) => m.InlineHsModule),
		canActivate: [AuthGuard]
	},
	{
		path: InlineDataNavigationPath.parent,
		data: { roles: NavConfig.getRoles(InlineDataNavigationPath.parent) },
		loadChildren: () => import('./inline-data/inline-data.module').then((m) => m.InlineDataModule),
		canActivate: [AuthGuard]
	},
	{
		path: ButtedLooseLeafNavigationPath.parent,
		data: { roles: NavConfig.getRoles(ButtedLooseLeafNavigationPath.parent) },
		loadChildren: () => import('./butted-loose-leaf/butted-loose-leaf.module').then((m) => m.ButtedLooseLeafModule),
		canActivate: [AuthGuard]
	},
	{
		path: StemInScrapNavigationPath.parent,
		data: { roles: NavConfig.getRoles(StemInScrapNavigationPath.parent) },
		loadChildren: () => import('./stem-in-scrap/stem-in-scrap.module').then((m) => m.StemInScrapModule),
		canActivate: [AuthGuard]
	},
	{
		path: StemDiameterNavigationPath.parent,
		data: { roles: NavConfig.getRoles(StemDiameterNavigationPath.parent) },
		loadChildren: () => import('./stem-diameter/stem-diameter.module').then((m) => m.StemDiameterModule),
		canActivate: [AuthGuard]
	},
	{
		path: DensityNavigationPath.parent,
		data: { roles: NavConfig.getRoles(DensityNavigationPath.parent) },
		loadChildren: () => import('./density/density.module').then((m) => m.DensityModule),
		canActivate: [AuthGuard]
	},
	{
		path: DegsNavigationPath.parent,
		data: { roles: NavConfig.getRoles(DegsNavigationPath.parent) },
		loadChildren: () => import('./degs/degs.module').then((m) => m.DegsModule),
		canActivate: [AuthGuard]
	},
	{
		path: SandNavigationPath.parent,
		data: { roles: NavConfig.getRoles(SandNavigationPath.parent) },
		loadChildren: () => import('./sand/sand.module').then((m) => m.SandModule),
		canActivate: [AuthGuard]
	},
	{
		path: FinesNavigationPath.parent,
		data: { roles: NavConfig.getRoles(FinesNavigationPath.parent) },
		loadChildren: () => import('./fines/fines.module').then((m) => m.FinesModule),
		canActivate: [AuthGuard]
	},
	{
		path: NtrmGreenNavigationPath.parent,
		data: { roles: NavConfig.getRoles(NtrmGreenNavigationPath.parent) },
		loadChildren: () => import('./ntrm-green/ntrm-green.module').then((m) => m.NtrmGreenModule),
	},
	{
		path: NtrmProductNavigationPath.parent,
		data: { roles: NavConfig.getRoles(NtrmProductNavigationPath.parent) },
		loadChildren: () => import('./ntrm-product/ntrm-product.module').then((m) => m.NtrmProductModule),
		canActivate: [AuthGuard]
	},
	{
		path: NtrmInLineNavigationPath.parent,
		data: { roles: NavConfig.getRoles(NtrmInLineNavigationPath.parent) },
		loadChildren: () => import('./ntrm-in-line/ntrm-in-line.module').then((m) => m.NtrmInLineModule),
		canActivate: [AuthGuard]
	},
	{
		path: MoistureAndTempNavigationPath.parent,
		data: { roles: NavConfig.getRoles(MoistureAndTempNavigationPath.parent) },
		loadChildren: () => import('./moisture-and-temp/moisture-and-temp.module').then((m) => m.MoistureAndTempModule),
		canActivate: [AuthGuard]
	},
	{
		path: ShakerEfficiencyNavigationPath.parent,
		data: { roles: NavConfig.getRoles(ShakerEfficiencyNavigationPath.parent) },
		loadChildren: () => import('./shaker-efficiency/shaker-efficiency.module').then((m) => m.ShakerEfficiencyModule),
		canActivate: [AuthGuard]
	},
	{
		path: BundleBusterNavigationPath.parent,
		data: { roles: NavConfig.getRoles(BundleBusterNavigationPath.parent) },
		loadChildren: () => import('./bundle-buster/bundle-buster.module').then((m) => m.BundleBusterModule),
		canActivate: [AuthGuard]
	},
	{
		path: StemAuditNavigationPath.parent,
		data: { roles: NavConfig.getRoles(StemAuditNavigationPath.parent) },
		loadChildren: () => import('./stem-audit/stem-audit.module').then((m) => m.StemAuditModule),
		canActivate: [AuthGuard]
	},
  	{
		path: SetupNavigationPath.parent,
		data: { roles: NavConfig.getSetupRoles(SetupNavigationPath.parent) },
		loadChildren: () => import('./setup/setup.module').then((m) => m.SetupModule),
		canActivate: [AuthGuard]
	},
	{
		path: ReportsNavigationPath.parent,
		data: { roles: NavConfig.getReportsRoles(ReportsNavigationPath.parent) },
		loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full',
	},
	{
		path: '**',
		redirectTo: 'error/404',
	},
];

export { Routing };
