import React from "react";

export interface IErrorComponentProps {
	message?: string;
}

export const ErrorComponent: React.FC<IErrorComponentProps> = ({ message }) => {
	return message ? (
		<div>
			<h1>Error</h1>
			<p>{message}</p>
		</div>
	) : null;
};
