import React from "react";
import {Link, useMatches} from "@remix-run/react";
import cn from "classnames";
import {ROUTES} from "~/constants/routes";

export interface IBreadcrumbs {
	className?: string;
}

export const Breadcrumbs: React.FC<IBreadcrumbs> = ({className}) => {
	const matches = useMatches();

	return (
		<nav className={cn("breadcrumbs py-6", className)}>
			<ul className="breadcrumbs__list">
				{matches[0].pathname === ROUTES.HOME && (
					<li className="breadcrumbs__breadcrumb-home">
						<Link to={ROUTES.HOME}>Главная /&nbsp;</Link>
					</li>
				)}
				{matches
					// skip routes that don't have a breadcrumb
					.filter(
						(match) =>
							match.handle && match.handle.breadcrumb
					)
					// render breadcrumbs!
					.map((match, index) => (
						<div className="flex" key={index}>
							<li className="breadcrumbs__breadcrumb">
								{match.handle.breadcrumb(match)}
							</li>
						</div>
					))}
			</ul>
		</nav>
	);
};
