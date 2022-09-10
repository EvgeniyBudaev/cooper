import * as React from "react";
import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import {json} from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration, useCatch, useLoaderData, useTransition,
} from "@remix-run/react";
import {useLocation} from "@remix-run/react";
import { cryptoRandomStringAsync } from "crypto-random-string";

import {getUser} from "./session.server";
import {ErrorComponent, Layout} from "~/components";
import {ROUTES} from "~/constants/routes";
import {Progress} from "~/ui-kit";
import { Environment } from "./enviroment.server";
import type { EnvironmentType } from "./enviroment.server"
import fonts from "./styles/fonts.css";
import styles from "./styles/app.css";

export const links: LinksFunction = () => {
	return [{rel: "stylesheet", href: styles}, {rel: "stylesheet", href: fonts}];
};

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Copper Pro",
	viewport: "width=device-width,initial-scale=1",
});

interface IWindowGlobals {
	sentryDsn?: string;
  }

type LoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
	cspScriptNonce: string;
	globals: IWindowGlobals;
	ENV: Pick<EnvironmentType, 'IS_PRODUCTION'>;
};

export const loader = async (args: LoaderArgs) => {
	const { request } = args;
	const cspScriptNonce = await cryptoRandomStringAsync({ length: 41 });

	return json<LoaderData>({
		user: await getUser(request),
		cspScriptNonce,
		globals: {
			sentryDsn: Environment.IS_PRODUCTION ? Environment.SENTRY_DSN : undefined,
		},
		ENV: {
			IS_PRODUCTION: Environment.IS_PRODUCTION,
		},
	});
};

type TDocumentProps = {
	cspScriptNonce?: string;
	children?: React.ReactNode;
  };

  const Document: React.FC<TDocumentProps> = ({ cspScriptNonce, children }) => {
	const transition = useTransition();

	if(typeof window !== "undefined") {
		cspScriptNonce = "";
	}

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
		<ScrollRestoration nonce={cspScriptNonce} />
		<Scripts nonce={cspScriptNonce} />
		{process.env.NODE_ENV === 'development' ? <LiveReload nonce={cspScriptNonce} /> : null}
		</body>
		</html>
	);
}

export default function App() {
	const { cspScriptNonce, globals, ENV } = useLoaderData<typeof loader>();
	const location = useLocation();

	return (
		<Document cspScriptNonce={cspScriptNonce}>
			{location.pathname === ROUTES.HOME ? <Outlet/> : (
				<Layout>
					<Outlet/>
				</Layout>
			)}
			<script
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: `window.GLOBALS=${JSON.stringify(globals)};window.ENV=${JSON.stringify(ENV)}`,
				}}
        	/>
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
