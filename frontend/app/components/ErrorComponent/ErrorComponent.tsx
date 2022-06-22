import type { VFC } from 'react';

interface Props {
  error?: Error;
  message?: string;
}

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

export const ErrorComponent: VFC<Props> = ({ message, error }) => {
  const errorMessage = message || error?.message || DEFAULT_ERROR_MESSAGE;

  return (
    <div className="bg-grey-light flex-1">
      <div className="bg-error-light bg-red rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-error-dark text-sm font-medium">{errorMessage}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
