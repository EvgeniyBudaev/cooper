import type { TFunction } from 'react-i18next';
import { translateRawData } from './i18next';

export function getFieldErrors(
    formState: Record<string, any>,
    t?: TFunction,
  ): Record<string, string | any | undefined> {
    const errorKeys = Object.keys(formState?.errors ?? {});
    return errorKeys.reduce((acc, errorKey) => {
      if (Array.isArray(formState?.errors?.[errorKey])) {
        const arrFieldsErrors = formState?.errors?.[errorKey][0];
        // @ts-ignore
        acc[errorKey] = {};
        for (let key in arrFieldsErrors) {
          const message = arrFieldsErrors[key]?.message;
          // @ts-ignore
          acc[errorKey][key] = t ? translateRawData(t, message) : message;
        }
      } else {
        const message = formState?.errors?.[errorKey]?.message;
        if (!message) {
            // @ts-ignore
          acc[errorKey] = {};
          for (let key in formState?.errors?.[errorKey]) {
            const message = formState?.errors?.[errorKey][key]?.message;
            // @ts-ignore
            acc[errorKey][key] = t ? translateRawData(t, message) : message;
          }
        } else {
            // @ts-ignore
          acc[errorKey] = t ? translateRawData(t, message) : message;
        }
      }
      return acc;
    }, {});
  }