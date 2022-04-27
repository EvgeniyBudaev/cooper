import React from "react";
import type {IProduct} from "~/api/product/types";
import {Product} from "~/components";

interface IProductListProps {
	products: IProduct[];
}

export const ProductList: React.FC<IProductListProps> = ({products}) => {
	return (
		<ul className="grid gap-5 grid-cols-3 mb-14">
			{products.map(product => <Product key={product._id} product={product}/>)}
		</ul>
	);
};
