import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import {json} from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import {useLocation} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import fonts from "./styles/fonts.css";
import {getUser} from "./session.server";
import {Layout} from "~/components";
import {ROUTES} from "~/constants/routes";

export const links: LinksFunction = () => {
	return [{rel: "stylesheet", href: tailwindStylesheetUrl}, {rel: "stylesheet", href: fonts}];
};

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Copper Pro",
	viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({request}) => {
	return json<LoaderData>({
		user: await getUser(request),
	});
};

export default function App() {
	const location = useLocation();

	return (
		<html lang="ru" className="h-full">
		<head>
			<Meta/>
			<Links/>
		</head>
		<body className="h-full">
		{location.pathname === ROUTES.HOME ? <Outlet/> : (
			<Layout>
				<Outlet/>
			</Layout>
		)}
		<ScrollRestoration/>
		<Scripts/>
		<LiveReload/>
		</body>
		</html>
	);
}
