import {HomePage} from "~/pages";
import {Link} from "@remix-run/react";
import {ROUTES} from "~/constants/routes";

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

  return (
    <main className="">
      <HomePage />
    </main>
  );
}
