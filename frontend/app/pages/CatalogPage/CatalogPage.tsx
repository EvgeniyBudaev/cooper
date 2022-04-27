import React from "react";
import {Link, useLocation, useNavigate} from "@remix-run/react";
import type {IPaging, IProduct} from "~/api/product/types";
import {ProductList} from "~/components";
import {ROUTES} from "~/constants/routes";
import {Pagination} from "~/ui-kit";

export interface ICatalogPageProps {
	products: IProduct[];
	paging: IPaging;
}

export const CatalogPage: React.FC<ICatalogPageProps> = ({products, paging}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handlePageChange = ({selected}: { selected: number }) => {
		navigate(`${location.pathname}?page=${selected + 1}`, {replace: true});
	};

	return (
		<>
			<h2 className="pb-8 text-h2 font-lighthaus font-normal">Каталог</h2>
			<div className="flex flex-wrap justify-between mb-10 pb-10 border-b border-solid border-[#EBEBEB]">
				<Link to={`${ROUTES.CATALOG}${ROUTES.OILS_ESSENTIAL}`} className="bg-[url('/assets/images/catalog-essential-oils.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div
						className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-essential-oils-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Для эфирных масел</div>
					</div>
				</Link>
				<Link to={`${ROUTES.CATALOG}${ROUTES.GIDROLAT}`} className="bg-[url('/assets/images/catalog-hydrolate.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div
						className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-hydrolate-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Для гидролатов</div>
					</div>
				</Link>
				<Link to={`${ROUTES.CATALOG}${ROUTES.COPPER_UTENSILS}`} className="bg-[url('/assets/images/catalog-copper-utensils.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div
						className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-copper-utensils-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Медная посуда</div>
					</div>
				</Link>
				<Link to={`${ROUTES.CATALOG}${ROUTES.ACCESSORIES}`} className="bg-[url('/assets/images/catalog-copper-accessories.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div
						className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-copper-accessories-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Аксессуары из меди</div>
					</div>
				</Link>
			</div>
			<ProductList products={products}/>
			<Pagination
				pagesCount={paging.pagesCount}
				onChange={handlePageChange}
			/>
		</>
	);
};
