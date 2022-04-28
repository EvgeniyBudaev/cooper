import {Link, useLoaderData} from "@remix-run/react";
import type {LoaderFunction} from "@remix-run/node";
import {getProductByProductSlug} from "~/api/product";
import type {IProduct} from "~/api/product/types";
import {mapCatalogSlugToTitle} from "~/constants/paths";
import {ROUTES} from "~/constants/routes";
import {ProductPage} from "~/pages";
import type {IBreadcrumbByProductSlug} from "~/types/breadcrumb";
import type {TCatalogSlug} from "~/types/path";

export const loader: LoaderFunction = async ({request, params}) => {
	if (params.productSlug) {
		return await getProductByProductSlug(params.productSlug);
	} else {
		return {};
	}
}

export const getTitleByCatalogSlug = (slug: TCatalogSlug): string => {
	return mapCatalogSlugToTitle.get(slug) as string;
}

export const handle = {
	breadcrumb: (props: IBreadcrumbByProductSlug) => {
		const titleCatalogBySlug = getTitleByCatalogSlug(props.params.catalogSlug as TCatalogSlug);
		return (
			<>
				<Link
					to={`${ROUTES.CATALOG}`}>
					Каталог /
				</Link>
				<Link
					to={`${ROUTES.CATALOG}/${props.params.catalogSlug}`}>
					{titleCatalogBySlug} /
				</Link>
				<Link
					to={`${ROUTES.CATALOG}/${props.params.catalogSlug}/products/${props.data.product.productSlug}`}>
					{props.data.product.title}
				</Link>
			</>
		)
	},
};

interface IProductData {
	product: IProduct;
}

function Index() {
	const data = useLoaderData<IProductData>();
	return <ProductPage product={data.product}/>;
}

export default Index;
