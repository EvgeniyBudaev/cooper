import type {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import * as React from "react";
import * as server from "~/mocks";

export const loader: LoaderFunction = async () => {
	server.init();
	console.log("START");
	const res =  await fetch('http://localhost:3000/contacts').then((res) => res.json());
	console.log("RESULT: ", res);
	return res;
}

function Index() {
	const data = useLoaderData();
	console.log("DATA: ", data);

	return (
		<section>
			<h1>Контакты</h1>
			<p>Страница в разработке.</p>
		</section>
	);
}

export default Index;
