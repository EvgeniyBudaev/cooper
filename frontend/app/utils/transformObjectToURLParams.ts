import { omitEmptyFields } from "~/types/form";
import type { TParams } from "~/types/form";


export function transformObjectToURLParams(params: TParams): string {
  return new URLSearchParams(Object.entries(omitEmptyFields(params))).toString();
}
