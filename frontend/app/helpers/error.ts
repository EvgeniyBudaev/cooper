import type { ComponentType } from 'react';
import { useCatch } from "@remix-run/react";
import { ErrorBoundary } from '~/components';
import type { ErrorBoundaryComponent } from '@remix-run/node';
import axios from 'axios';

interface CreateCatchBoundaryParams {
  statusMap?: Map<number, string>;
  defaultMessage?: string;
  defaultStatusMessage?: string;
}

const DEFAULT_STATUS_MESSAGE = 'Unexpected caught response with status';

export const createCatchBoundary =
  ({
    statusMap,
    defaultMessage,
    defaultStatusMessage = DEFAULT_STATUS_MESSAGE,
  }: CreateCatchBoundaryParams = {}): ComponentType =>
  () => {
    const caught = useCatch();

    const message =
      statusMap?.get(caught.status) ||
      caught.data ||
      defaultMessage ||
      `${defaultStatusMessage}: ${caught.status}`;

    throw new Error(message);
  };

interface ErrorBoundaries {
  ErrorBoundary: ErrorBoundaryComponent;
  CatchBoundary: ComponentType;
}

type CreateCommonErrorBoundariesParams = Parameters<typeof createCatchBoundary>;

export const createBoundaries = (...params: CreateCommonErrorBoundariesParams): ErrorBoundaries => {
  const CatchBoundary = createCatchBoundary(...params);

  return {
    ErrorBoundary,
    CatchBoundary,
  };
};

export const errorMessageBoundary = (messageProd: string, messageDev: string = messageProd): string => {
  return process.env.NODE_ENV === 'development' ? messageDev : messageProd;
};

export const rethrowAxiosError = (error: any) => {
  if(axios.isAxiosError(error) && error.response) {
    throw new Response(error.response.statusText, {
      status: error.response.status,
    });
  } else {
    throw error;
  }
}
