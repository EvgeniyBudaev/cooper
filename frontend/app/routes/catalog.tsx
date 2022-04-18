import {CatalogPage} from "~/pages";
import {Link} from "@remix-run/react";
import {ROUTES} from "~/constants/routes";

export const handle = {
	breadcrumb: () => <Link
		to={ROUTES.CATALOG}>
		Каталог
	</Link>,
	pageTitle: "Каталог",
	source: (
		<pre>{`{
    breadcrumb: () => <Link to={ROUTES.CATALOG}>Каталог</Link>,
    pageTitle: "Каталог"
}`}</pre>
	)
};

function Catalog() {
	return <CatalogPage />;
}

export default Catalog;
