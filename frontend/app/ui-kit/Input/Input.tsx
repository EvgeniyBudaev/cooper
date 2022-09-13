import * as React from 'react';
import clsx from 'clsx';

import { Label } from '../Label';
import { SIZES, THEMES } from './constants';
import type { TInputProps } from './types';

const InputComponent = React.forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      autoFocus,
      classes = {},
      disabled,
      fieldError,
      inputSize = 'xl',
      label,
      loading,
      name,
      noFocus,
      onBlur,
      onChange,
      onFocus,
      prefixIcon,
      postfixIcon,
      required = false,
      theme = 'default',
      type = 'text',
      helperText,
      hasError,
      dataTestId,
      hidden,
      ...props
    },
    ref,
  ) => {
    const [focus, setFocus] = React.useState<boolean | undefined>(autoFocus);

    const onBlurCallback = (event: React.FocusEvent<HTMLInputElement>) => {
      if (focus) {
        setFocus(false);
      }

      if (onBlur) {
        onBlur(event);
      }
    };

    const onFocusCallback = (event: React.FocusEvent<HTMLInputElement>) => {
      if (!focus) {
        setFocus(true);
      }

      if (onFocus) {
        onFocus(event);
      }
    };

    const input = (
      <input
        ref={ref}
        aria-invalid={Boolean(fieldError) || undefined}
        aria-errormessage={fieldError ? `${name}-error` : undefined}
        className={clsx(
          'w-full focus:border-transparent focus:ring-0',
          SIZES[inputSize].input,
          classes.input || THEMES[theme].input,
        )}
        disabled={disabled}
        name={name}
        onBlur={onBlurCallback}
        onChange={onChange}
        onFocus={onFocusCallback}
        type={type}
        hidden={hidden}
        {...props}
      />
    );

    return hidden ? (
      input
    ) : (
      <div
        className={clsx(
          'field-input transition-colors',
          SIZES[inputSize].root,
          classes.root || THEMES[theme].root,
          {
            'text-gray-500': !focus,
            'text-primary': !noFocus && focus,
          },
        )}
        data-testid={dataTestId}
      >
        {!!label && (
          <Label
            as="div"
            className={clsx(SIZES[inputSize].label, classes.label || THEMES[theme].label)}
          >
            {label}
          </Label>
        )}

        <label
          className={clsx(
            disabled ? 'bg-grey' : 'bg-light',
            SIZES[inputSize].wrapper,
            classes.wrapper || THEMES[theme].wrapper,
            !classes.wrapper && {
              'outline-transparent': !focus,
              'outline-blue-600': focus,
            },
            (hasError || !!fieldError) && 'outline-accent1',
          )}
        >
          {!!prefixIcon && prefixIcon}

          {input}

          {loading && <div>Loading...</div>}

          {!!postfixIcon && postfixIcon}
        </label>

        {helperText && (
          <div
            className={clsx('rounded-md p-1 text-sm font-medium', {
              'error-component text-accent1 bg-red-50': hasError,
              'text-gray-500': !hasError,
            })}
          >
            {helperText}
          </div>
        )}

        {fieldError && (
          <p
            className="text-error-dark mt-1 whitespace-pre-line text-xs font-semibold"
            role="alert"
            id={`${name}-error`}
          >
            {fieldError}
          </p>
        )}
      </div>
    );
  },
);

InputComponent.displayName = 'InputComponent';

export const Input = React.memo(InputComponent);
