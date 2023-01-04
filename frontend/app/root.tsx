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

import {commitSession, getSession, getUser} from "./session.server";
import {ErrorComponent, Layout} from "~/components";
import {ROUTES} from "~/constants/routes";
import {Progress} from "~/ui-kit";
import { Environment } from "./enviroment.server";
import type { EnvironmentType } from "./enviroment.server"
import fonts from "./styles/fonts.css";
import styles from "./styles/app.css";
import { AuthenticityTokenProvider, createAuthenticityToken } from "remix-utils";
import { createBoundaries } from "./utils/boundaries/createBoundaries";

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

type RootLoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
	cspScriptNonce: string;
	csrfToken: string;
	globals: IWindowGlobals;
	ENV: Pick<EnvironmentType, 'IS_PRODUCTION'>;
};

export const loader = async (args: LoaderArgs) => {
	const { request } = args;
	const cspScriptNonce = await cryptoRandomStringAsync({ length: 41 });
	const session = await getSession(request);
	const csrfToken = createAuthenticityToken(session);

	return json<RootLoaderData>({
		user: await getUser(request),
		cspScriptNonce,
		csrfToken,
		globals: {
			sentryDsn: Environment.IS_PRODUCTION ? Environment.SENTRY_DSN : undefined,
		},
		ENV: {
			IS_PRODUCTION: Environment.IS_PRODUCTION,
		},
	}, {
		headers: {
			"Set-Cookie": await commitSession(session),
		}
	});
};

type TDocumentProps = {
	cspScriptNonce?: string;
	children?: React.ReactNode;
	env?: RootLoaderData["ENV"];
};

const Document: React.FC<TDocumentProps> = ({ cspScriptNonce, children, env }) => {
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
		{env?.IS_PRODUCTION === false && <LiveReload nonce={cspScriptNonce} />}
		</body>
		</html>
	);
}

export default function App() {
	const { cspScriptNonce, csrfToken, globals, ENV } = useLoaderData<typeof loader>();
	const location = useLocation();

	return (
		<AuthenticityTokenProvider token={csrfToken}>
			<Document cspScriptNonce={cspScriptNonce} env={ENV}>
				{location.pathname === ROUTES.HOME ? <Outlet/> : (
					<Layout>
						<Outlet/>
					</Layout>
				)}
				<script
					nonce={cspScriptNonce}
					suppressHydrationWarning
					dangerouslySetInnerHTML={{
						__html: `window.GLOBALS=${JSON.stringify(globals)};window.ENV=${JSON.stringify(ENV)}`,
					}}
						/>
			</Document>
		</AuthenticityTokenProvider>
	);
}

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
	Layout: Document,
});
