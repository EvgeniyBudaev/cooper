import axios from "axios";
import type {ISignupPayload} from "~/api/user/types";
import {backendBase} from "~/constants/paths";

// export const signup = async (formData: FormData): Promise<any> => {
export const signup = async (name: any, email: any, password: any, image: any, formData: any): Promise<any> => {
	console.log("api signup formData: ");
	// const name = formData.get("name");
	// const email = formData.get("email");
	// const password = formData.get("password");
	// const image = formData.get("image");
	//
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const body = JSON.stringify({
		name,
		email,
		password,
		image,
	});
	const formData2 = new FormData();
	formData2.append("name", name);
	formData2.append("email", email);
	formData2.append("password", password);
	formData2.append("image", image);
	console.log("body: ", body);
	const response = await axios.post(
		`${backendBase}api/v1/users/signup`,
		body,
		config
	);
	console.log("response:", response);
	return response.data;
	// return null;
};
