import React from "react";

export interface IErrorComponentProps {
	message?: string;
}

export const CatchComponent: React.FC<IErrorComponentProps> = ({ message }) => {
	return message ? (
		<div>
			<h1>Catch Error</h1>
			<p>{message}</p>
		</div>
	) : null;
};
