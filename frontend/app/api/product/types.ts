export interface IPaging {
	totalItemsCount: number;
	pageItemsCount: number;
	pagesCount: number;
}

export interface ICategory {
	_id: string;
	title: string;
	categorySlug: string;
}

export interface IProduct {
	_id: string;
	category: ICategory;
	productSlug: string;
	title: string;
	price: string;
	quantity: number;
	image: string;
	description: string;
}
