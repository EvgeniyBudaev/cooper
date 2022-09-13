import isNil from 'lodash/isNil';
import pickBy from 'lodash/pickBy';

export type TParams = Record<string, any>;

export function omitEmptyFields(fields: Record<string, any>): Record<string, any> {
    return pickBy(fields, (field) => {
      if (isNil(field) || ((typeof field === 'string' || Array.isArray(field)) && !field.length)) {
        return false;
      }
  
      return true;
    });
  }
  
