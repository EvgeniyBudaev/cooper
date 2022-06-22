import {Link, useCatch, useLoaderData} from "@remix-run/react";
import type {LoaderFunction} from "@remix-run/node";
import {getProductByProductSlug} from "~/api/product";
import type {IProduct} from "~/api/product/types";
import {mapCatalogSlugToTitle} from "~/constants/paths";
import {ROUTES} from "~/constants/routes";
import {ProductPage} from "~/pages";
import type {IBreadcrumbByProductSlug} from "~/types/breadcrumb";
import type {TCatalogSlug} from "~/types/path";
import {ErrorComponent} from "~/components";
import * as React from "react";
import { createBoundaries, errorMessageBoundary } from "~/helpers/error";

export const loader: LoaderFunction = async ({request, params}) => {
    if (!params.productSlug) {
        throw new Response("Not Found*", {
          status: 404,
        });
      }

	return await getProductByProductSlug(params.productSlug);
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

// export function ErrorBoundary({ error }: { error: Error }) {
// 	return <ErrorComponent message={error.message} />;
// }

// export function CatchBoundary() {
// 	const caught = useCatch();

// 	if (caught.status === 404) {
// 		return <ErrorComponent message="Продукт не найден" />;
// 	}
// 	throw new Error(`Unexpected caught response with status: ${caught.status}`);
// }

export const { ErrorBoundary, CatchBoundary } = createBoundaries({
	statusMap: new Map([
	  [404, errorMessageBoundary('Продукт не найден 404')],
	  [500, errorMessageBoundary('Ошибка на сервере 500')],
	  [501, errorMessageBoundary('Ошибка на сервере 501')],
	]),
  });

export default Index;
