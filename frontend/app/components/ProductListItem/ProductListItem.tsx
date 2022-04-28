import React from "react";
import {Link} from "@remix-run/react";
import type {IProduct} from "~/api/product/types";
import {ROUTES} from "~/constants/routes";

interface IProductListItemProps {
	product: IProduct;
}

export const ProductListItem: React.FC<IProductListItemProps> = ({product}) => {
	const {category, image, title, price, productSlug} = product;

	return (
		<li>
			<Link to={`${ROUTES.CATALOG}/${category.categorySlug}/products/${productSlug}`}><img className="mb-5" src={image} alt={title} /></Link>
			<div className="flex justify-between">
				<h3 className="max-w-[280px] text-xl font-semibold">{title}</h3>
				<p className="text-3xl font-extrabold">{price} руб.</p>
			</div>
		</li>
	);
};
