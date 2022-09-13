import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthenticityTokenInput } from 'remix-utils';
import { Form, useFetcher } from '@remix-run/react';
import { omitEmptyFields } from '~/types/form';
import type { TParams } from '~/types/form';
import { EFormFields } from './types';
import { getFieldErrors } from '~/utils/form';
import { Button, Input } from '~/ui-kit';


type TProps = {
    isLoading: boolean;
    onChangeParams: (params: TParams) => void;
  };

export const FilterForm: FC<TProps> = ({ isLoading, onChangeParams }) => {
    const { t } = useTranslation();
    const { register, control, handleSubmit, formState, reset } = useForm();

    const errors = getFieldErrors(formState, t);

    const onSubmit = (data: Record<string, any>) => onChangeParams(omitEmptyFields(data));

    return (
        <div className="bg-light flex flex-col gap-8 rounded-2xl p-6">
            <Form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
                <AuthenticityTokenInput />
                <div className="grid grid-cols-4 gap-8">
                    <Input
                        {...register(EFormFields.Email)}
                        hasError={!!errors[EFormFields.Email]}
                        helperText={errors[EFormFields.Email]}
                        placeholder={"Email"}
                    />
                    <Input
                        {...register(EFormFields.Password)}
                        hasError={!!errors[EFormFields.Password]}
                        helperText={errors[EFormFields.Password]}
                        placeholder={"Password"}
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="submit"
                        // disabled={isLoading}
                    >
                        Send
                    </Button>
                </div>
            </Form>
        </div>
    );
}