import * as React from "react";
import type {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export const loader: LoaderFunction = async () => {
	return await fetch("http://localhost:3000/contacts").then(res => res.json());
}

function Index() {
	const data = useLoaderData();
	console.log("DATA: ", data);

	return (
		<section>
			<h1>Contacts</h1>
			<h2>First name: {data.firstName}</h2>
			<h2>Last name: {data.lastName}</h2>
		</section>
	);
}

export default Index;
