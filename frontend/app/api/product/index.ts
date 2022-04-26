import axios from "axios";
import type {IPaging, IProduct} from "~/api/product/types";
import {backendBase} from "~/constants/paths";

const config = {
	headers: {
		"Content-Type": "application/json",
	},
};

export const getProducts = async (
	page: number | string
): Promise<IProduct[]> => {
	const response = await axios.get<IProduct[]>(
		`${backendBase}api/v1/products/?page=${page}`,
		config
	);
	return response.data;
};

export const getProductsPaging = async (): Promise<IPaging> => {
	const response = await axios.get<IPaging>(
		`${backendBase}api/v1/products/paging`,
		config
	);
	return response.data;
};
