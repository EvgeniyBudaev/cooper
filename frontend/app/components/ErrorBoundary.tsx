import type { ErrorBoundaryComponent } from '@remix-run/node';
import { ErrorComponent } from '~/components';

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <ErrorComponent error={error} />;
};
