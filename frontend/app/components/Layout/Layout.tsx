import React from "react";
import {useLocation} from "@remix-run/react";
import cn from "classnames";
import {Header} from "~/components";
import {ROUTES} from "~/constants/routes";

export const Layout: React.FC = ({children}) => {
	const location = useLocation();

	return (
		<div>
			<Header/>
			<div className={cn({"container mx-auto px-4": location.pathname !== ROUTES.HOME})}>
				{children}
			</div>
		</div>
	);
};
