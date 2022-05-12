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
	ScrollRestoration, useCatch, useTransition,
} from "@remix-run/react";
import {useLocation} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import fonts from "./styles/fonts.css";
import {getUser} from "./session.server";
import {ErrorComponent, Layout} from "~/components";
import {ROUTES} from "~/constants/routes";
import {Progress} from "~/ui-kit";
import * as React from "react";

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

function Document({ children }: { children: React.ReactNode }) {
	const transition = useTransition();

	return (
		<html lang="ru" className="h-full bg-gray-100">
		<head>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=yes"
			/>
			<Meta />
			<Links />
		</head>
		<body className="min-h-full ">
		{transition.state === "loading" && <Progress />}
		{children}
		<ScrollRestoration />
		<Scripts />
		{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
		</body>
		</html>
	);
}

export default function App() {
	const location = useLocation();

	return (
		<Document>
			{location.pathname === ROUTES.HOME ? <Outlet/> : (
				<Layout>
					<Outlet/>
				</Layout>
			)}
		</Document>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<Document>
			<ErrorComponent message={error.message} />
		</Document>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	let message;
	switch (caught.status) {
		case 401:
			message = <div>Нет прав к этой странице..</div>;
			break;
		case 404:
			message = <div>Страница не сущестует.</div>;
			break;

		default:
			throw new Error(caught.data || caught.statusText);
	}

	return (
		<Document>
			<ErrorComponent message={`${caught.status} ${caught.statusText} ${message}`} />
		</Document>
	);
}
