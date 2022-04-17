import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import cn from "classnames";

export interface IButtonProps
	extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement> {
	className?: string;
	onClick?: (event: React.MouseEvent) => void;
}

export const Button: React.FC<IButtonProps> = ({
																								 className,
																								 children,
																								 onClick,
																								 ...rest
																							 }) => {
	return (
		<button
			className={cn("btn-primary")}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	);
};
