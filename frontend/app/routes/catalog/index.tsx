import {Link, useLoaderData} from "@remix-run/react";
import type {LoaderFunction} from "@remix-run/node";
import {getProducts, getProductsPaging} from "~/api/product";
import type {IPaging, IProduct} from "~/api/product/types";
import {ROUTES} from "~/constants/routes";
import {CatalogPage} from "~/pages";

export const loader: LoaderFunction = async ({request}) => {
	const url = new URL(request.url);
	const pageCurrentNumber = url.searchParams.get("page");
	const response = await Promise.all([getProducts(pageCurrentNumber ?? 1), getProductsPaging()]);
	return {products: response[0], paging: response[1]};
};

export const handle = {
	breadcrumb: () => <Link
		to={ROUTES.CATALOG}>
		Каталог
	</Link>,
	pageTitle: "Каталог",
	source: (
		<pre>{`{
    breadcrumb: () => <Link to={ROUTES.CATALOG}>Каталог</Link>,
    pageTitle: "Каталог"
}`}</pre>
	)
};

interface ICatalogData {
	products: IProduct[];
	paging: IPaging;
}

function Index() {
	const data = useLoaderData<ICatalogData>();
	return <CatalogPage products={data.products} paging={data.paging}/>;
}

export default Index;
