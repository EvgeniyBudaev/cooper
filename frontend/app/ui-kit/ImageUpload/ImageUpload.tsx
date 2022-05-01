import type {ForwardedRef} from "react";
import React, { forwardRef, useEffect, useRef, useState} from "react";
import cn from "classnames";

export interface IImageUploadProps {
	className?: string;
	autoFocus?: boolean;
	autoComplete?: string;
	errorText?: string;
	id: string;
	name?: string;
	required?: boolean;
	type?: string;
	isCenter?: boolean;
	onInput: (id: string, pickedFile: File | undefined, fileIsValid: boolean) => void;
}

export const ImageUpload = forwardRef(
	(
		{ className, autoComplete, autoFocus, errorText, id, name, required, type, isCenter, onInput }: IImageUploadProps,
		ref: ForwardedRef<HTMLInputElement>
	): JSX.Element => {
		const filePickerRef = useRef<HTMLInputElement>(null);
		const [file, setFile] = useState<File>();
		const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();
		const [isValid, setIsValid] = useState(false);

		useEffect(() => {
			if (!file) {
				return;
			}
			const fileReader = new FileReader();
			fileReader.onload = () => {
				setPreviewUrl(fileReader.result);
			};
			fileReader.readAsDataURL(file);
		}, [file]);

		const handlePickImage = () => {
			if (filePickerRef.current) {
				filePickerRef.current.click();
			}
		};

		const handlePicked = (event: React.ChangeEvent<HTMLInputElement>) => {
			let pickedFile;
			let fileIsValid = isValid;
			if (event.target.files && event.target.files.length === 1) {
				pickedFile = event.target.files[0];
				setFile(pickedFile);
				setIsValid(true);
				fileIsValid = true;
			} else {
				setIsValid(false);
				fileIsValid = false;
			}
			onInput(id, pickedFile, fileIsValid);
		};

		return (
			<div className={cn(className)}>
				<input
					className="hidden"
					accept=".jpg,.png,.jpeg"
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					id={id}
					name={name}
					ref={filePickerRef}
					required={required}
					type={type}
					onChange={handlePicked}
				/>
				<div className={cn(isCenter ? "flex justify-center items-center flex-col": "")}>
					<div
						className="flex justify-center items-center text-center mb-4 h-52 w-52 border border-solid border-[#CCCCCC]"
					>
						{previewUrl && <img className="h-full w-full object-cover" src={previewUrl as string} alt="Preview"/>}
						{!previewUrl && "Пожалуйста, выберите изображение."}
					</div>
					<div className="btn-primary" onClick={handlePickImage}>Выбрать изображение</div>
				</div>
				{!isValid && <p>{errorText}</p>}
			</div>
		);
	}
);

ImageUpload.displayName = "ImageUpload";