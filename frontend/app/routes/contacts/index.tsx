import type {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import * as React from 'react';

export const loader: LoaderFunction = async () => {
	console.log("START");
	const res =  await fetch('/contacts').then((res) => res.json());
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
