import invariant from "tiny-invariant";

export type EnvironmentType = {

  IS_PRODUCTION: boolean;
  SENTRY_DSN?: string;
};

const { NODE_ENV, SENTRY_DSN } = process.env;



/**
 * Переменные окружения
 */
export const Environment: EnvironmentType = {

  IS_PRODUCTION: NODE_ENV === "production",
  SENTRY_DSN,
};
