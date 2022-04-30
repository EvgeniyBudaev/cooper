import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  json,
  redirect,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData
} from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { getUserId, createUserSession } from "~/session.server";

import { createUser, getUserByEmail } from "~/models/user.server";
import { validateEmail } from "~/utils";
import {ImageUpload} from "~/ui-kit";
import {signup} from "~/api/user/user";
import axios from "axios";
import {backendBase} from "~/constants/paths";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors: {
    name?: string;
    email?: string;
    password?: string;
    image?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  // const uploadHandler = unstable_createFileUploadHandler({
  //   maxFileSize: 5_000_000,
  //   file: ({ filename }) => filename,
  // });
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxFileSize: 500_000,
  });
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler // <-- we'll look at this deeper next
  );
  // const formData = await request.formData();
  console.log("FormData: ", formData);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const image = formData.get("image");

  const response = await axios.post(
    `${backendBase}api/v1/users/signup`,
    formData
  );

  // console.log("IMAGE: ", image);
  // const redirectTo = formData.get("redirectTo");

  // if (!validateEmail(email)) {
  //   return json<ActionData>(
  //     { errors: { email: "Email is invalid" } },
  //     { status: 400 }
  //   );
  // }

  // if (typeof password !== "string") {
  //   return json<ActionData>(
  //     { errors: { password: "Password is required" } },
  //     { status: 400 }
  //   );
  // }

  // if (password.length < 6) {
  //   return json<ActionData>(
  //     { errors: { password: "Password is too short" } },
  //     { status: 400 }
  //   );
  // }

  // const existingUser = await getUserByEmail(email);
  // if (existingUser) {
  //   return json<ActionData>(
  //     { errors: { email: "A user already exists with this email" } },
  //     { status: 400 }
  //   );
  // }

  // const user = await signup(name, email, password, image, formData);
  //
  // return createUserSession({
  //   request,
  //   userId: user.id,
  //   remember: false,
  //   redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  // });
  return null;
};

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const imageRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  // React.useEffect(() => {
  //   if (actionData?.errors?.email) {
  //     emailRef.current?.focus();
  //   } else if (actionData?.errors?.password) {
  //     passwordRef.current?.focus();
  //   } else if (actionData?.errors?.name) {
  //     nameRef.current?.focus();
  //   }
  // }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Имя пользователя
            </label>
            <div className="mt-1">
              <input
                ref={nameRef}
                id="name"
                required
                autoFocus={true}
                name="name"
                type="name"
                autoComplete="name"
                aria-invalid={actionData?.errors?.name ? true : undefined}
                aria-describedby="name-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.name && (
                <div className="pt-1 text-red-700" id="name-error">
                  {actionData.errors.name}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Фотография профиля
            </label>
            <div className="mt-1">
              <ImageUpload
                // autoFocus={true}
                id="image"
                name="image"
                // ref={imageRef}
                // required
                type="file"
                isCenter={true}
                onInput={() => {}}
                // aria-invalid={actionData?.errors?.image ? true : undefined}
                // aria-describedby="image-error"
                // className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {/*{actionData?.errors?.image && (*/}
              {/*  <div className="pt-1 text-red-700" id="image-error">*/}
              {/*    {actionData.errors.image}*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Зарегистрироваться
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Есть аккаунт?{" "}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Войти
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
