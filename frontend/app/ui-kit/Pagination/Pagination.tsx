import React from "react";
import ReactPaginate from "react-paginate";
import cn from "classnames";
import {ArrowLeft} from "~/ui-kit/Icon/ArrowLeft";
import {ArrowRight} from "~/ui-kit/Icon/ArrowRight";

export interface IPaginationProps {
	className?: string;
	initialPage?: number;
	marginPagesDisplayed?: number;
	pagesCount: number;
	pageRangeDisplayed?: number;
	onChange: ({selected}: { selected: number }) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
																												 className,
																												 initialPage,
																												 marginPagesDisplayed = 3,
																												 pagesCount,
																												 pageRangeDisplayed = 3,
																												 onChange,
																											 }) => {
	return (
		<ReactPaginate
			initialPage={initialPage}
			marginPagesDisplayed={marginPagesDisplayed}
			pageCount={pagesCount}
			pageRangeDisplayed={pageRangeDisplayed}
			onPageChange={onChange}
			containerClassName={cn("flex items-center justify-center list-none outline-none pagination", className)}
			activeClassName={cn("bg-gradient-to-r from-brown1 to-beige1 !text-white pagination__active")}
			pageLinkClassName={cn("flex items-center justify-center text-center w-9.5 h-12 pagination__link")}
			breakLinkClassName={"pagination__link"}
			nextLinkClassName={"pagination__link"}
			previousLinkClassName={"pagination__link"}
			pageClassName={cn("m-2 w-9.5 h-12 border border-solid border-secondary text-2xl text-secondary font-semibold pagination__item")}
			breakClassName={"pagination__item"}
			nextClassName={"pagination__item"}
			previousClassName={"pagination__item"}
			previousLabel={
				<>
					<ArrowLeft />
				</>
			}
			nextLabel={
				<>
					<ArrowRight />
				</>
			}
		/>
	);
};
