import React from "react";
import {IProduct} from "~/api/product/types";

interface IProductProps {
	product: IProduct;
}

export const Product: React.FC<IProductProps> = ({product}) => {
	const {image, title, price} = product;

	return (
		<li>
			<img className="mb-5" src={image} alt={title} />
			<div className="flex justify-between">
				<h3 className="max-w-[280px] text-xl font-semibold">{title}</h3>
				<p className="text-3xl font-extrabold">{price} руб.</p>
			</div>
		</li>
	);
};
