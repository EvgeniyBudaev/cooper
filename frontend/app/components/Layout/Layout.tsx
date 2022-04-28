import React from "react";
import {Container, Footer, Header} from "~/components";
import {Breadcrumbs} from "~/ui-kit";

export const Layout: React.FC = ({children}) => {
	return (
		<>
			<Header/>
			<Container>
				<Breadcrumbs />
				{children}
			</Container>
			<Footer />
		</>
	);
};
