import { useState } from 'react';
import { Column } from '@tanstack/react-table';
import { Autocomplete, TextField } from '@mui/material';
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

  return (
    <Autocomplete
      freeSolo
      inputValue={value}
      onInputChange={(_, newValue: string) => setValue(newValue)}
      onChange={(_, newValue: string) => {
        setValue(newValue);
        column.setFilterValue(newValue);
      }}
      options={sortedUniqueValues}
      renderInput={(props) => (
        <TextField
          {...props}
          placeholder={`Search (${sortedUniqueValues.length})`}
        />
      )}
    />
  );
};
