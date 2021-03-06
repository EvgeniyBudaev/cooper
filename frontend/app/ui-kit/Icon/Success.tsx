import React from "react";

interface ISuccessProps {
	color?: string;
}

export const Success: React.FC<ISuccessProps> = ({color}) => {
	return (
		<svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M11.18 0.172424L4.54999 6.86741L1.81999 4.13741L0 5.9574L4.54999 10.5724L13 2.0574L11.18 0.172424Z"
						fill={color ? color : "currentColor"}/>
		</svg>
	);
};
