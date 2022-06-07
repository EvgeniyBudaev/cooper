import {HomePage} from "~/pages";
import {Link} from "@remix-run/react";
import {ROUTES} from "~/constants/routes";
import * as server from "~/mocks";

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

export default function Index() {
  server.init();

  return (
    <main className="">
      <HomePage />
    </main>
  );
}
