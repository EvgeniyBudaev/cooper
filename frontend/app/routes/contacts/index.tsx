import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ContactsPage } from '~/pages/ContactsPage';
import type { TContactsData } from '~/types/constacts';

export const loader = async (args: LoaderArgs) => {
	const { request } = args;
	const url = new URL(request.url);
	const params = {
	  ...Object.fromEntries(url.searchParams),
	  size: 10,
	};
	const data: TContactsData = await fetch("http://localhost:3000/contacts").then(res => res.json());
	return json({data, params, title: "Контакты"});
}

export const meta: MetaFunction = ({ data }) => {
	return { title: data?.title };
  };

function Index() {
	const { data, params } = useLoaderData<typeof loader>();

	return (
		<section>
			<h1>ContactsPage</h1>
			<ContactsPage data={data} params={params} />
		</section>
	);
}

export default Index;
