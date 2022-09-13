import { useCallback } from 'react';
import type { FC } from 'react';
import { useFetcher } from '@remix-run/react';
import { FilterForm } from '~/entities/contacts';
import type { TContactsData } from '~/types/constacts';
import type { TParams } from '~/types/form';
import { transformObjectToURLParams } from '~/utils/transformObjectToURLParams';

type TProps = {
    data?: TContactsData;
    params: TParams;
  };

export const ContactsPage: FC<TProps> = (props) => {
  const fetcher = useFetcher();

  const isLoading = fetcher.state !== 'idle';

  const onLoadContacts = useCallback(
    (params: TParams) => {
      fetcher.load(`/contacts?index&${transformObjectToURLParams(params)}`);
    },
    [fetcher],
  );

  return (
    <div>
        <FilterForm isLoading={isLoading} onChangeParams={onLoadContacts} />
    </div>
  )
};