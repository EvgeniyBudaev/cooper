import React from "react";
import {Container, Header} from "~/components";

export const Layout: React.FC = ({children}) => {
	return (
		<>
			<Header/>
			<Container>
				{children}
			</Container>
		</>
	);
};
