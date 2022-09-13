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
    
  // при загрузке страницы берем данные из loader, потом из fetcher
  const contactsDetails: TContactsData = fetcher.data?.data ?? props.data;
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

        <h2>First name: </h2>
        <div>{contactsDetails.firstName}</div>
        <br />
        <h2>Last name: </h2>
        <div>{contactsDetails.lastName}</div>
    </div>
  )
};