import type {MutableRefObject} from "react";
import {useEffect, useRef} from "react";
import {useTransition} from "@remix-run/react";

export function useProgress(): MutableRefObject<HTMLDivElement | null> {
	const el = useRef<HTMLDivElement>(null);
	const timeout = useRef<NodeJS.Timeout>();
	const {location} = useTransition();

	useEffect(() => {
		if (!location || !el.current) {
			return;
		}

		if (timeout.current) {
			clearTimeout(timeout.current);
		}

		el.current.style.width = `0%`;

		let updateWidth = (ms: number) => {
			timeout.current = setTimeout(() => {
				if (el.current) {
					let width = parseFloat(el.current.style.width);
					let percent = !isNaN(width) ? 10 + 0.9 * width : 0;
					el.current.style.width = `${percent}%`;
				}
				updateWidth(100);
			}, ms);
		};

		updateWidth(300);

		return () => {
			timeout.current && clearTimeout(timeout.current);

			if (el.current && el.current.style.width === `0%`) {
				return;
			}

			if (el.current) {
				el.current.style.width = `100%`;
			}
			timeout.current = setTimeout(() => {
				if (el.current?.style.width !== '100%') {
					return;
				}

				el.current.style.width = ``;
			}, 200);
		};
	}, [location, el]);

	return el;
}

export const Progress: React.FC = () => {
	const progress = useProgress();

	return (
		<div className="fixed top-0 left-0 right-0 h-1 flex">
			<div
				ref={progress}
				className="transition-all ease-out bg-gradient-to-r from-green-400 via-blue-500 to-pink-500"
			/>
		</div>
	);
}
