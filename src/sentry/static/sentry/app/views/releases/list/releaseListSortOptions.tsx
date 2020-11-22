import React from 'react';

import {t} from 'app/locale';

import ReleaseListDropdown from './releaseListDropdown';

const sortOptions = [
  {
    key: 'crash_free_users',
    label: t('Crash Free Users'),
  },
  {
    key: 'crash_free_sessions',
    label: t('Crash Free Sessions'),
  },
];

type Props = {
  selected: string;
  onSelect: (key: string) => void;
};

function ReleaseListSortOptions({selected, onSelect}: Props) {
  return (
    <ReleaseListDropdown
      label={t('Display')}
      options={sortOptions}
      selected={selected}
      onSelect={onSelect}
    />
  );
}

export default ReleaseListSortOptions;
