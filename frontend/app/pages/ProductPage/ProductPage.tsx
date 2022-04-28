import React from "react";
import type {IProduct} from "~/api/product/types";
import {Button} from "~/ui-kit";
import {Success} from "~/ui-kit/Icon/Success";
import {numberWithSpaces} from "~/utils/price";

export interface IProductPageProps {
	product: IProduct;
}

export const ProductPage: React.FC<IProductPageProps> = ({product}) => {
	const {description, image, price, title, quantity} = product;

	return (
		<section>
			<div className="flex justify-between mb-20 pb-20 border-b border-solid border-[#EBEBEB]">
				<img className="max-h-160 max-w-screen-sm w-full mr-5" src={image} alt={title} />
				<div className="w-full">
					<h2 className="mb-9 text-h3 font-lighthaus font-normal uppercase">{title}</h2>
					<div className="mb-9 pb-9 border-b border-solid border-[#EBEBEB]">
						{quantity > 0
							? (
								<div className="flex items-center items-center">
									<Success color="#4B7159" />
									<span className="ml-2 text-green1 font-extrabold">В наличии</span>
								</div>
							)
							: <div>Товар отсутствует</div>}
					</div>
					<div className="mb-4 uppercase font-extrabold">Описание</div>
					<p className="mb-9 pb-9 border-b border-solid border-[#EBEBEB] font-light">{description}</p>
					<div className="flex justify-between items-center mb-8">
						<div className="text-h4 font-semibold">Цена</div>
						<div className="text-fs-45 text-red1 font-extrabold">{numberWithSpaces(price)} руб</div>
					</div>
					<div className="flex justify-between items-center">
						<div className="flex items-center h-12.5 max-w-52 w-full">
							<div className="flex items-center justify-center h-12.5 max-w-12.5 w-full border border-solid border-[#E6E8E7] cursor-pointer text-xl font-extrabold">
								-
							</div>
							<div className="flex items-center justify-center h-12.5 w-full border-t border-b border-solid border-[#E6E8E7] text-xl font-extrabold">
								1
							</div>
							<div className="flex items-center justify-center h-12.5 max-w-12.5 w-full border border-solid border-[#E6E8E7] text-xl cursor-pointer font-extrabold">
								+
							</div>
						</div>
						<Button>Купить</Button>
					</div>
				</div>
			</div>
			<div className="mb-8 text-h3 font-lighthaus font-normal uppercase">Описание</div>
			<p className="mb-9 font-light">{description}</p>
		</section>
	);
};
