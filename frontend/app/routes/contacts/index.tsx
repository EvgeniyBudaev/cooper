import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getContacts } from '~/entities/contacts';
import { ContactsPage } from '~/pages/ContactsPage';

export const action = async (args: ActionArgs) => {
	const { request } = args;
	console.log("[action request]", request);
	return null;
}

export const loader = async (args: LoaderArgs) => {
	const { request } = args;
	const url = new URL(request.url);
	const params = {
	  ...Object.fromEntries(url.searchParams)
	};
	const result: any = await getContacts(request, params);
	console.log("[loader result]", result);
	return json({data: "200", params, title: "Контакты"});
}

export const meta: MetaFunction = ({ data }) => {
	return { title: data?.title };
  };

function Index() {
	const { params } = useLoaderData<typeof loader>();

	return (
		<section>
			<h1>ContactsPage</h1>
			<ContactsPage params={params} />
		</section>
	);
}

export default Index;
