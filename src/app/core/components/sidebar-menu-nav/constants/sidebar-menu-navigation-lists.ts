import { StemInScrapsNavigations } from 'src/app/pages/stem-in-scrap/navigation/stem-in-scrap-sidebar-navigation';
import { ButtedLooseLeafNavigations } from '../../../../pages/butted-loose-leaf/navigation/butted-loose-leaf-sidebar-navigation';
import { FlagOnStemsNavigations } from '../../../../pages/flag-on-stem/navigation/flag-on-stem-sidebar-navigation';
import { LeavesNavigations } from '../../../../pages/leaves/navigation/leaves-sidebar-navigation';
import { LooseLeafNavigations } from '../../../../pages/loose-leaf/navigation/loose-leaf-sidebar-navigation';
import { StemLengthNavigations } from '../../../../pages/stem-length/navigation/stem-length-sidebar-navigation';
import { TipsNavigations } from '../../../../pages/tips/navigation/tips-sidebar-navigation';
import { SidebarNavMenu } from "../models/sidebar-menu-nav-type";
import { ShortStemsNavigations } from '../../../../pages/short-stem/navigation/short-stem-sidebar-navigation';
import { StemDiameterNavigations } from '../../../../pages/stem-diameter/navigation/stem-diameter-sidebar-navigation';
import { InlineDataNavigations } from '../../../../pages/inline-data/navigation/inline-data-sidebar-navigation';
import { InlineHsNavigations } from '../../../../pages/inline-hs/navigation/inline-hs-sidebar-navigation';
import { DensitysNavigations } from '../../../../pages/density/navigation/density-sidebar-navigation';
import { SetupNavigations } from 'src/app/pages/setup/setup-navigations';
import { DegsNavigations } from 'src/app/pages/degs/navigation/degs-sidebar-navigation';
import { SandNavigations } from 'src/app/pages/sand/navigation/sand-sidebar-navigation';
import { FinesNavigations } from 'src/app/pages/fines/navigation/fines-sidebar-navigation';
import { NtrmGreenNavigations } from 'src/app/pages/ntrm-green/navigation/ntrm-green-sidebar-navigation';
import { NtrmProductsNavigations } from 'src/app/pages/ntrm-product/navigation/ntrm-product-sidebar-navigation';
import { NtrmInLineNavigations } from 'src/app/pages/ntrm-in-line/navigation/ntrm-in-line-sidebar-navigation';
import { MoistureAndTempsNavigations } from 'src/app/pages/moisture-and-temp/navigation/moisture-and-temp-sidebar-navigation';
import { ReportsNavigations } from 'src/app/pages/reports/reports-navigations';
import { ShakerEfficiencyNavigations } from 'src/app/pages/shaker-efficiency/navigation/shaker-efficiency-sidebar-navigation';
import { BundleBusterNavigations } from 'src/app/pages/bundle-buster/navigation/bundle-buster-sidebar-navigation';
import { StemAuditNavigations } from 'src/app/pages/stem-audit/navigation/stem-audit-sidebar-navigation';

export const labTestsNavigationMenus: SidebarNavMenu[] = [
	StemLengthNavigations.routes,
	ShortStemsNavigations.routes,
	FlagOnStemsNavigations.routes,
	TipsNavigations.routes,
	LeavesNavigations.routes,
	LooseLeafNavigations.routes,
	ButtedLooseLeafNavigations.routes,
	StemInScrapsNavigations.routes,
	StemDiameterNavigations.routes,
	InlineDataNavigations.routes,
	InlineHsNavigations.routes,
	DensitysNavigations.routes,
	DegsNavigations.routes,
	SandNavigations.routes,
	FinesNavigations.routes,
	NtrmGreenNavigations.routes,
	NtrmProductsNavigations.routes,
	NtrmInLineNavigations.routes,
	MoistureAndTempsNavigations.routes,
	ShakerEfficiencyNavigations.routes,
	BundleBusterNavigations.routes,
	StemAuditNavigations.routes,
];

export const setupNavigationMenus: SidebarNavMenu[] = [
	SetupNavigations.routes
];

export const reportsNavigationMenus: SidebarNavMenu[] = [
	ReportsNavigations.routes
];
