import React from "react";

export const CatalogPage: React.FC = () => {
	return (
		<>
			<h2 className="pb-8 text-h2 font-lighthaus font-normal">Каталог</h2>
			<div className="flex flex-wrap justify-between">
				<div className="bg-[url('/assets/images/catalog-essential-oils.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-essential-oils-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Для эфирных масел</div>
					</div>
				</div>
				<div className="bg-[url('/assets/images/catalog-hydrolate.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-hydrolate-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Для гидролатов</div>
					</div>
				</div>
				<div className="bg-[url('/assets/images/catalog-copper-utensils.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-copper-utensils-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Медная посуда</div>
					</div>
				</div>
				<div className="bg-[url('/assets/images/catalog-copper-accessories.jpg')] bg-no-repeat h-36 w-full max-w-xs">
					<div className="flex items-end justify-center pb-5 bg-[url('/assets/images/catalog-copper-accessories-bg.png')] bg-no-repeat h-full w-full">
						<div className="text-xl text-white font-semibold">Аксессуары из меди</div>
					</div>
				</div>
			</div>
		</>
	);
};
