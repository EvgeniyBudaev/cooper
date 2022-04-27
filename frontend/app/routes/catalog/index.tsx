import {Link, useLoaderData} from "@remix-run/react";
import type {LoaderFunction} from "@remix-run/node";
import {getProducts, getProductsPaging} from "~/api/product";
import {ROUTES} from "~/constants/routes";
import type {IPaging, IProduct} from "~/api/product/types";
import {CatalogPage} from "~/pages";

export const loader: LoaderFunction = async ({request}) => {
	const url = new URL(request.url);
	const pageCurrentNumber = url.searchParams.get("page");
	const products = await getProducts(pageCurrentNumber ?? 1);
	const paging = await getProductsPaging();
	return {products, paging};
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
