import React from "react";
import {Container, Footer, Header} from "~/components";
import {Breadcrumbs} from "~/ui-kit";

type TProps = {
	children: React.ReactNode;
};

export const Layout: React.FC<TProps> = ({children}) => {
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
