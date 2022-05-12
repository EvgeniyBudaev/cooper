import * as z from "zod";
import {makeDomainFunction} from "remix-domains";
import {login} from "~/api/user/user";

export const userLoginSchema = z.object({
	email: z.string().nonempty().email(),
	password: z.string().nonempty(),
});
type User = z.infer<typeof userLoginSchema>;

export const getUser = makeDomainFunction(userLoginSchema)(async ({email, password}) =>
	await login(email, password),
);
