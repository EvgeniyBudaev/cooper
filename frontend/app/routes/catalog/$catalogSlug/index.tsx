import {Link, useLoaderData} from "@remix-run/react";
import type {LoaderFunction} from "@remix-run/node";
import {getProductsByCategorySlug, getProductsByCategorySlugPaging} from "~/api/product";
import {ROUTES} from "~/constants/routes";
import type {IPaging, IProduct} from "~/api/product/types";
import {mapCatalogSlugToTitle} from "~/constants/paths";
import {CatalogPage} from "~/pages";
import type {TCatalogSlug} from "~/types/path";
import {IBreadcrumb} from "~/types/breadcrumb";

export const loader: LoaderFunction = async ({request, params}) => {
	const url = new URL(request.url);
	const pageCurrentNumber = url.searchParams.get("page");
	if (params.catalogSlug) {
		const products = await getProductsByCategorySlug(pageCurrentNumber ?? 1, params.catalogSlug);
		const paging = await getProductsByCategorySlugPaging(params.catalogSlug);
		return {products, paging};
	} else {
		return {};
	}
};

export const getTitleByCatalogSlug = (slug: TCatalogSlug): string => {
	return mapCatalogSlugToTitle.get(slug) as string;
}

export const handle = {
	breadcrumb: (props: IBreadcrumb) => {
		const titleBySlug = getTitleByCatalogSlug(props.params.catalogSlug as TCatalogSlug);
		return (
			<>
				<Link
					to={`${ROUTES.CATALOG}`}>
					Каталог /
				</Link>
				<Link
					to={`${ROUTES.CATALOG}/${props.params.catalogSlug}`}>
					{titleBySlug}
				</Link>
			</>
		)
	},
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
