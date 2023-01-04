import { inputFromSearch } from "remix-domains";
import {Link} from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import {ROUTES} from "~/constants/routes";
import * as server from "~/mocks";
import {HomePage} from "~/pages";

export const handle = {
  breadcrumb: () => <Link
    to={ROUTES.HOME}>
    Главная
  </Link>,
  pageTitle: "Главная",
  source: (
    <pre>{`{
    breadcrumb: () => <Link to={ROUTES.HOME}>Главная</Link>,
    pageTitle: "Главная"
}`}</pre>
  )
};

export const loader = async (args: LoaderArgs) => {
  const { request } = args;
  const url = new URL(request.url);
  const formValues = inputFromSearch(url.searchParams);
  console.log("[Home loader formValues] ", formValues);

  return null;
}

export default function Index() {
  server.init();

  return (
    <main className="">
      <HomePage />
    </main>
  );
}
