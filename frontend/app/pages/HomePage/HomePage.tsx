import React from "react";
import {Link} from "@remix-run/react";
import {Header} from "~/components";
import {Container} from "~/components";
import {Button} from "~/ui-kit";

export const HomePage: React.FC = () => {
	return (
		<div className="bg-[url('/assets/images/home-bg.png')] h-screen max-h-full bg-no-repeat">
			<Header/>
			<Container>
				<h1 className="mt-36 mb-12 text-h1 text-white font-lighthaus">Хит продаж</h1>
				<div className="mb-12 h-px max-w-screen-sm bg-gradient-to-r from-white" />
				<h2 className="mb-10 text-h2 text-white font-extrabold max-w-lg">Дистиллятор для эфирных масел</h2>
				<div className="flex mb-10">
					<span className="mr-24 text-3xl text-white">Цена</span>
					<span className="text-3xl text-white font-extrabold">180 000 руб</span>
				</div>
				<Button>Купить</Button>
			</Container>
		</div>
	);
};
