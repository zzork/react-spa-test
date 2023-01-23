import React, { useState } from 'react';
import { Column } from '@tanstack/react-table';
import { Autocomplete, TextField } from '@mui/material';
import { useDebounce } from './useDebounce';
import classNames from './Filter.module.css';

type Range = [min: number, max: number];

const validateRange = (value: number, min: number, max: number) =>
  typeof value === 'number' && value >= min && value <= max;

export const RangeFilter = <T,>({
  column,
  debounce = 500,
}: {
  column: Column<T, unknown>;
  debounce?: number;
}) => {
  const [filter, setFilter] = useState<Range>(
    (column.getFilterValue() ?? ['', '']) as Range
  );
  useDebounce({ value: filter, ms: debounce, onChange: column.setFilterValue });
  const [min, max] = column.getFacetedMinMaxValues() as [number, number];

  const handleChange = (e, idx: number) => {
    const newFilter: Range = [...filter];
    const newValue = Number(e.target.value);
    if (validateRange(newValue, min, max)) {
      newFilter[idx] = newValue;
      setFilter(() => newFilter);
    }
  };

  return (
    <fieldset className={classNames.rangeFilter}>
      <TextField
        value={filter[0]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 0)
        }
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        placeholder={`Min (${min})`}
        size="small"
        margin="none"
      />
      <TextField
        value={filter[1]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 1)
        }
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        placeholder={`Max (${max})`}
        size="small"
        margin="none"
      />
    </fieldset>
  );
};

export const Filter = <T,>({
  column,
  debounce = 500,
}: {
  column: Column<T, unknown>;
  debounce?: number;
}) => {
  const [filter, setFilter] = useState<string>(
    (column.getFilterValue() ?? '') as string
  );
  useDebounce({ value: filter, ms: debounce, onChange: column.setFilterValue });

  const sortedUniqueValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort();

  return (
    <Autocomplete
      freeSolo
      inputValue={filter}
      onInputChange={(_, newValue: string) => setFilter(newValue)}
      onChange={(_, newValue: string) => {
        setFilter(newValue);
        column.setFilterValue(newValue);
      }}
      options={sortedUniqueValues}
      renderInput={(props) => (
        <TextField
          {...props}
          placeholder={`Search (${sortedUniqueValues.length})`}
          size="small"
          margin="none"
        />
      )}
    />
  );
};
