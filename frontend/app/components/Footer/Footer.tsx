import React from "react";
import {Link, NavLink} from "@remix-run/react";
import {Container} from "~/components";
import {Logo} from "~/ui-kit/Icon/Logo";
import {ROUTES} from "~/constants/routes";

export const Footer: React.FC = () => {
	return (
		<section className="mt-9 py-14 w-full bg-[url('/assets/images/footer-bg.jpg')]">
			<Container>
				<div className="flex items-center justify-between">
					<div>
						<NavLink className="mr-20" to="/">
							<Logo className="mb-6" />
						</NavLink>
						<div className="text-sm font-light text-gray1">© 2021 “Copper Pro”</div>
						<div className="mb-5 text-sm font-light text-gray1">Все права защищенны</div>
						<div className="text-sm font-light text-white">Политика конфиденциальности</div>
					</div>
					<div className="flex justify-between">
						<div>
							<div className="mb-4 text-lg text-white font-extrabold">Навигация</div>
							<ul className="flex flex-col text-sm text-white font-light">
								<li className="mb-4">
									<NavLink
										className={({isActive}) =>
											`transition-all
									 ${isActive
												? "border-b border-white solid"
												: undefined}`}
										to={`${ROUTES.CATALOG}?page=1`}>
										Каталог
									</NavLink>
								</li>
								<li className="mb-4">
									<NavLink
										className={({isActive}) =>
											`transition-all
									 ${isActive
												? "border-b border-white solid"
												: undefined}`}
										to={ROUTES.NEWS}>
										Новости
									</NavLink>
								</li>
								<li className="mb-4">
									<NavLink
										className={({isActive}) =>
											`transition-all
									 ${isActive
												? "border-b border-white solid"
												: undefined}`}
										to={ROUTES.SHIPPING}>
										Доставка
									</NavLink>
								</li>
								<li className="mb-4">
									<NavLink
										className={({isActive}) =>
											`transition-all
									 ${isActive
												? "border-b border-white solid"
												: undefined}`}
										to={ROUTES.ABOUT}>
										О нас
									</NavLink>
								</li>
								<li>
									<NavLink
										className={({isActive}) =>
											`transition-all
									 ${isActive
												? "border-b border-white solid"
												: undefined}`}
										to={ROUTES.CONTACTS}>
										Контакты
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="ml-20">
							<div className="mb-4 text-lg text-white font-extrabold">Каталог</div>
							<ul className="flex flex-col text-sm text-white font-light">
								<li className="mb-4">
									<Link to={`${ROUTES.CATALOG}${ROUTES.OILS_ESSENTIAL}`}>Для эфирных масел</Link>
								</li>
								<li className="mb-4">
									<Link to={`${ROUTES.CATALOG}${ROUTES.GIDROLAT}`}>Для гидролатов</Link>
								</li>
								<li className="mb-4">
									<Link to={`${ROUTES.CATALOG}${ROUTES.COPPER_UTENSILS}`}>Медная посуда</Link>
								</li>
								<li className="mb-4">
									<Link to={`${ROUTES.CATALOG}${ROUTES.ACCESSORIES}`}>Аксессуары из меди</Link>
								</li>
								<li className="mb-4">
									<Link to={`/`}>Индивидуальный заказ</Link>
								</li>
								<li>
									<Link to={`/`}>Скидки и предложения</Link>
								</li>
							</ul>
						</div>
						<div className="ml-20">
							<div className="mb-4 text-lg text-white font-extrabold">Контакты</div>
							<ul className="flex flex-col text-sm text-white font-light">
								<li className="mb-4">
									Ленина 8-Б, Москва, Россия
								</li>
								<li className="mb-4">
										<a href="tel:+74956498387">
											+7 (495) 649-83-87
										</a>
								</li>
								<li>
									<a href={"mailto:copper@gmail.com"}>
										copper@gmail.com
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};
