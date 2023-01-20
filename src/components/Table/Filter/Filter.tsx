import { useState } from 'react';
import { Column } from '@tanstack/react-table';
import { useDebounce } from './useDebounce';

export const Filter = <T,>({
  column,
  debounce = 500,
}: {
  column: Column<T, unknown>;
  debounce?: number;
}) => {
  const [value, setValue] = useState<string>(
    (column.getFilterValue() ?? '') as string
  );
  useDebounce({ value, ms: debounce, onChange: column.setFilterValue });

  const sortedUniqueValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort();
  const listId = column.id + 'datalist';

  return (
    <div>
      <datalist id={listId}>
        {sortedUniqueValues.map((value) => (
          <option key={value} value={value} />
        ))}
      </datalist>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        list={listId}
        placeholder={`Search (${sortedUniqueValues.length})`}
        style={{ width: '6rem' }}
      />
    </div>
  );
};
