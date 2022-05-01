import axios from "axios";
import type {ISignupResponse} from "~/api/user/types";
import {backendBase} from "~/constants/paths";

export const signup = async (formData: FormData): Promise<ISignupResponse> => {
	const response = await axios.post<ISignupResponse>(
		`${backendBase}api/v1/users/signup`,
		formData
	);
	return response.data;
};
