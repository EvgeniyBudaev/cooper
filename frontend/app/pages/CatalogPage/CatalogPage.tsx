import React, {useEffect, useState} from "react";
import {useLocation} from "@remix-run/react";
import isEmpty from "lodash/isEmpty";
import {getProducts, getProductsPaging} from "~/api/product";
import {IPaging, IProduct} from "~/api/product/types";
import {ProductList} from "~/components";
import {Pagination} from "~/ui-kit";
import {redirect} from "@remix-run/node";

export interface IProductRange {
	startProduct: number;
	endProduct: number;
}

export const CatalogPage: React.FC = () => {
	const location = useLocation();
	const path = location.pathname;
	console.log(location);
	const [products, setProducts] = useState<IProduct[]>([]);
	const [paging, setPaging] = useState<IPaging>({
		totalItemsCount: 0,
		pageItemsCount: 0,
		pagesCount: 0,
	});
	const [productRange, setProductRange] = useState<IProductRange>({
		startProduct: 0,
		endProduct: 0,
	});
	const [currentPage, setCurrentPage] = useState(1);
	const pageNumber = 1;
	// const pageNumber = !isNaN(Number(router.asPath.split("=")[1]))
	// 	? Number(router.asPath.split("=")[1])
	// 	: 1;

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const products = await getProducts(1);
				const paging = await getProductsPaging();
				setProducts(products);
				setPaging(paging);
			} catch (e) {
				console.error(e);
			}
		};
		void fetchProducts();
	}, []);

	const handlePageChange = ({selected}: { selected: number }) => {
		setCurrentPage(selected + 1);
		redirect(`${path}?page=${selected + 1}`);
	};

	return (
		<>
			<h2 className="pb-8 text-h2 font-lighthaus font-normal">Каталог</h2>
			<div className="flex flex-wrap justify-between mb-10 pb-10 border-b border-solid border-[#EBEBEB]">
				<div className="bg-[url('/assets/images/catalog-essential-oils.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div
						className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-essential-oils-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Для эфирных масел</div>
					</div>
				</div>
				<div className="bg-[url('/assets/images/catalog-hydrolate.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div
						className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-hydrolate-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Для гидролатов</div>
					</div>
				</div>
				<div className="bg-[url('/assets/images/catalog-copper-utensils.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div
						className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-copper-utensils-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Медная посуда</div>
					</div>
				</div>
				<div className="bg-[url('/assets/images/catalog-copper-accessories.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div
						className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-copper-accessories-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Аксессуары из меди</div>
					</div>
				</div>
			</div>
			<ProductList products={products}/>
			<Pagination
				initialPage={pageNumber - 1}
				pagesCount={paging.pagesCount}
				onChange={handlePageChange}
			/>
		</>
	);
};
