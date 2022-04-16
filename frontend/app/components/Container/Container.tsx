import React from "react";

export const Container: React.FC = ({ children }) => {
	return <div className="container mx-auto px-4 flex flex-col">{children}</div>;
};
