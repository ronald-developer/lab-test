type PageAction = { name: string, allowedRoles: string[] };
export type SidebarNavMenu = {
	route: string,
	title: string,
	order: number,
	isParent?: boolean,
	useAsDialog?: boolean, // will not be shown in the sidebar nav menu
	hide?: boolean, // when a menu is not intended to be a dialog and we
	children?: SidebarNavMenu[],
	icon?: string,
	allowedRoles: string[],
	pageActions?: PageAction[]
}
