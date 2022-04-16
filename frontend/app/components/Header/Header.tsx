import React from "react";
import {useLocation} from "@remix-run/react";
import {Link} from "@remix-run/react";
import cn from "classnames";
import {Container} from "~/components";
import {ROUTES} from "~/constants/routes";

export const Header: React.FC = () => {
	const location = useLocation();

	return (
		<div className={cn("pt-5", {"bg-[url('/assets/images/navbar.jpg')]": location.pathname !== ROUTES.HOME})}>
			<Container>
				<nav className="flex items-center">
					<Link className="mr-20" to="/">
						<img src="/assets/images/logo.svg" alt="Cooper Pro"/>
					</Link>
					<ul className="flex items-end text-white font-semibold h-10 min-h-full">
						<li className="mr-12">
							<Link
								className="transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
								to="/catalog">
								Каталог
							</Link>
						</li>
						<li className="mr-12">
							<Link
								className="transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
								to="/">
								Новости
							</Link>
						</li>
						<li className="mr-12">
							<Link
								className="text-white transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
								to="/">
								Доставка
							</Link>
						</li>
						<li className="mr-12">
							<Link
								className="transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
								to="/">
								О нас
							</Link>
						</li>
						<li className="mr-12">
							<Link
								className="transition-all hover:text-transparent bg-clip-text bg-gradient-to-r from-[#5E3928] to-[#E4A16F]"
								to="/">
								Контакты
							</Link>
						</li>
					</ul>
				</nav>
			</Container>
		</div>
	);
};
