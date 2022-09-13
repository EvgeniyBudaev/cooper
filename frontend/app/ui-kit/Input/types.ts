import type { TLabelType } from '~/components';

export type TInputValue = string | number | readonly string[] | undefined | null;

export type TCustomInputProps = {
  classes?: {
    root?: string;
    label?: string;
    input?: string;
    wrapper?: string;
  };
  defaultValue?: TInputValue;
  fieldError?: string;
  inputSize?: 'xl';
  label?: TLabelType;
  loading?: boolean;
  noFocus?: boolean;
  prefixIcon?: JSX.Element;
  postfixIcon?: JSX.Element;
  ref?: React.ForwardedRef<HTMLInputElement>;
  theme?: 'default';
  value?: TInputValue;
  helperText?: string;
  hasError?: boolean;
  dataTestId?: string;
};

export type TInputProps = Omit<JSX.IntrinsicElements['input'], 'label'> & TCustomInputProps;
