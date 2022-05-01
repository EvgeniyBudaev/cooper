import axios from "axios";
import type {ISignupResponse} from "~/api/user/types";
import {backendBase} from "~/constants/paths";
import {default as NodeFormData} from "form-data";

export const signup = async (name: string, email: string, password: string, image: File): Promise<ISignupResponse> => {
	const nodeFormData = new NodeFormData();
	nodeFormData.append("name", name);
	nodeFormData.append("email", email);
	nodeFormData.append("password", password);
	nodeFormData.append("image", Buffer.from(await image.arrayBuffer()), {
		filename: image.name,
		contentType: image.type,
	});

	const response = await axios.post<ISignupResponse>(
		`${backendBase}api/v1/users/signup`,
		nodeFormData,
		{
			headers: nodeFormData.getHeaders(),
		}
	);
	return response.data;
};
