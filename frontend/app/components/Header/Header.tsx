import React from "react";
import {useLocation} from "@remix-run/react";
import {NavLink} from "@remix-run/react";
import cn from "classnames";
import {Container} from "~/components";
import {ROUTES} from "~/constants/routes";

export const Header: React.FC = () => {
	const location = useLocation();

	return (
		<div className={cn("pt-5", {"bg-[url('/assets/images/navbar.jpg')]": location.pathname !== ROUTES.HOME})}>
			<Container>
				<nav className="flex items-center">
					<NavLink className="mr-20" to="/">
						<img src="/assets/images/logo.svg" alt="Cooper Pro"/>
					</NavLink>
					<ul className="flex items-end text-white font-semibold h-10 min-h-full">
						<li className="mr-12">
							<NavLink
								className={({isActive}) =>
									`transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]
									 ${isActive
										? "text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
										: undefined}`}
								to={ROUTES.CATALOG}>
								Каталог
							</NavLink>
						</li>
						<li className="mr-12">
							<NavLink
								className={({isActive}) =>
									`transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]
									 ${isActive
										? "text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
										: undefined}`}
								to="/">
								Новости
							</NavLink>
						</li>
						<li className="mr-12">
							<NavLink
								className={({isActive}) =>
									`transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]
									 ${isActive
										? "text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
										: undefined}`}
								to="/">
								Доставка
							</NavLink>
						</li>
						<li className="mr-12">
							<NavLink
								className={({isActive}) =>
									`transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]
									 ${isActive
										? "text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
										: undefined}`}
								to="/">
								О нас
							</NavLink>
						</li>
						<li className="mr-12">
							<NavLink
								className={({isActive}) =>
									`transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]
									 ${isActive
										? "text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
										: undefined}`}
								to="/">
								Контакты
							</NavLink>
						</li>
					</ul>
				</nav>
			</Container>
		</div>
	);
};
