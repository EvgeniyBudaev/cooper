import React, {useEffect, useState} from "react";
import {Form, useLocation, useNavigate} from "@remix-run/react";
import qs from 'query-string';

export const Search: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const searchParams = qs.parse(location.search);

	const [value, setValue] = useState("");
	const [isFirstRender, setIsFirstRender] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsFirstRender(false);
		setValue(event.target.value);
	};
	
	const navigateTo = (pathname: string, page: Array<string | null> | string | null, title?: Array<string | null> | string) => {
		navigate(
			`${pathname}?${page ? `page=${page}` : ""}${title ? `&title=${title}` : ""}`,
			{replace: true}
		);
	};

	useEffect(() => {
		setIsFirstRender(true);
	}, []);

	useEffect(() => {
		if (isFirstRender) {
			if (searchParams.title) {
				navigateTo(location.pathname, searchParams.page, searchParams.title);
			} else {
				navigateTo(location.pathname, searchParams.page);
			}
		} else {
			if (value) {
				navigateTo(location.pathname, searchParams.page, value);
			}
			else {
				navigateTo(location.pathname, searchParams.page);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFirstRender, location.pathname, navigate, searchParams.page, searchParams.title, value]);

	return (
		<Form className="mb-10" method="get">
			<input
				className="border-b border-solid border-[#031412] outline-none"
				autoComplete="off"
				name="search"
				placeholder="Поиск"
				type="text"
				onChange={handleInputChange}
			/>
		</Form>
	);
};
