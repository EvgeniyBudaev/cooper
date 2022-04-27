import type {IPaging, IProduct} from "~/api/product/types";

interface IBreadcrumbData {
	products: IProduct;
	paging: IPaging;
}

export interface IBreadcrumb {
	data: IBreadcrumbData;
	handle: {breadcrumb: any};
	id: string;
	params: {catalogSlug: string};
	pathname: string;
}