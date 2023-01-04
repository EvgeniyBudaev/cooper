import React from "react";

type TProps = {
	children: React.ReactNode;
};

export const Container: React.FC<TProps> = ({ children }) => {
	return <div className="container mx-auto px-4 flex flex-col">{children}</div>;
};
