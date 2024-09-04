import { Icons } from "@/components/icons";
import {
	IconUsersGroup,
	IconUserShield,
	IconHeadphones,
	IconDoorExit,
	IconMoneybag,
} from "@tabler/icons-react";
import { ShieldIcon, SettingsIcon} from "lucide-react";
import { ROUTE } from ".";

export interface NavLink {
	title: string;
	label?: string;
	variant?: "default" | "destructive";
	href: string;
	icon: JSX.Element;
}

export interface SideLink extends NavLink {
	sub?: NavLink[];
}

export const AdminRoutes = {
	ClubTypes: "/admin/club-types",
};

export const sidelinks: SideLink[] = [
	{
		title: "Home",
		label: "",
		href: ROUTE.HOME,
		icon: <Icons.dashboard size={18} />,
	},
	{
		title: "Admin",
		label: "",
		href: "",
		icon: <ShieldIcon size={18} />,
		sub: [
			{
				title: "Products",
				label: "",
				href: ROUTE.PRODUCTS.INDEX,
				icon: <IconUserShield size={18} />,
			},
		],
	},
	
];

export const bottomSidelinks: SideLink[] = [
	{
		title: "Log Out",
		label: "",
		href: "/logout",
		variant: "destructive",
		icon: <IconDoorExit size={18} />,
	},

];
