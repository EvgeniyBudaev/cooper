import type {IPaging, IProduct} from "~/api/product/types";

interface IBreadcrumbCatalogSlugData {
	products: IProduct;
	paging: IPaging;
}

interface IBreadcrumbProductSlugData {
	product: IProduct;
}

export interface IBreadcrumbByCatalogSlug {
	data: IBreadcrumbCatalogSlugData;
	handle: {breadcrumb: any};
	id: string;
	params: {catalogSlug: string};
	pathname: string;
}

export interface IBreadcrumbByProductSlug {
	data: IBreadcrumbProductSlugData;
	handle: {breadcrumb: any};
	id: string;
	params: {catalogSlug: string};
	pathname: string;
}